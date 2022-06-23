import { gql, AuthenticationError } from "apollo-server-core";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config()

export const typeDefs = gql`

    type User {
        id: ID
        cuId: ID
        userName: String
    }

    type UserPayload {
        user: User
        authToken: String!
    }

    # Deleting logged in user. Needs to be changed to correct definition of who can delete who. 
    type UserDeletePayload {
        errors: [Error!]!
        deletedUserId: ID
    }


    input UserInput {
        cuId: ID!
        userName: String!
        password: String!
    }

    input AuthInput {
        userName: String!
        password: String!
    }

    input UpdatePassword {
        userName: String!
        password: String!
        newPassword: String!
    }

    type Query {
        users: [User]
    }
    
    type Mutation {
        userCreate(input: UserInput): User!
        userLogin(input: AuthInput!): UserPayload!
        userDelete: UserDeletePayload!
        userChangePassword(input: UpdatePassword!): User!
    }
`;

export const resolvers = {
    Query: {
        users: async (_, __, { user, auth, dataSources }) => {
            if (!user && !auth) {
                throw new AuthenticationError("Not authenticated, login for extra info")
            }
            console.log('user context', user);
            const allowed = await auth.canUpdate('CoreUnit', user.cuId)
            console.log('allwoed', allowed[0].count)
            const [resources] = await dataSources.db.getResourceId(user.id);
            console.log('resources', resources.resourceId)
            return 'users'

        }
    },
    Mutation: {
        userLogin: async (_, { input }, { dataSources }) => {
            try {
                const [user] = await dataSources.db.getUser(input.userName)
                const resources = await dataSources.db.getResourceId(user.id);
                const [resource] = resources.filter(rs => rs !== null)
                const resourceId = resource.resourceId
                if (user != undefined && resourceId != undefined) {
                    const match = await bcrypt.compare(input.password, user.password);
                    if (match === true) {
                        const token = jwt.sign(
                            { id: user.id, cuId: user.cuId, userName: user.userName },
                            process.env.SECRET,
                            { algorithm: "HS256", subject: `${user.id}`, expiresIn: "1d" }
                        );
                        return {
                            user: {
                                id: user.id,
                                cuId: resourceId,
                                userName: user.userName
                            },
                            authToken: token
                        }
                    } else {
                        throw new Error('wrong password? ')
                    }
                } else {
                    throw new Error('no such user')
                }
                // const hash = await bcrypt.hash('supremeAccess999', 10);
                // console.log('hash', hash)
            } catch (error) {
                throw new AuthenticationError(error ? error : 'User not signed up')
            }
        },
        userCreate: async (_, { input }, { user, dataSources }) => {
            try {
                if (user.sub === '0') {
                    const [userObj] = await dataSources.db.getUser(input.userName)
                    if (userObj == undefined) {
                        const hash = await bcrypt.hash(input.password, 10);
                        const result = await dataSources.db.createUser(input.cuId, input.userName, hash);
                        console.log('result', result)
                        return result;
                    } else {
                        throw new Error('Username already exists, try another one')
                    }
                } else {
                    throw new Error('Not authorised for this step')
                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'Try again once you have reached the supreme level')
            }
        },
        userChangePassword: async (_, { input }, { user, dataSources }) => {
            try {
                if (user) {
                    const [userObj] = await dataSources.db.getUser(input.userName)
                    const match = await bcrypt.compare(input.password, userObj.password);
                    if (match) {
                        const hash = await bcrypt.hash(input.newPassword, 10);
                        const result = await dataSources.db.changeUserPassword(input.userName, hash);
                        console.log('result', result)
                        return result[0];
                    } else {
                        throw new Error('wrong password')
                    }
                } else {
                    throw new Error('Gotta be logged in first no?')
                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'password is incorrect')
            }
        }

    }
};