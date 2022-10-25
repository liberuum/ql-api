import { gql, AuthenticationError } from "apollo-server-core";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config()

export const typeDefs = [gql`

    type User {
        id: ID
        cuId: ID
        username: String
    }

    type UserPayload {
        user: User
        authToken: String!
    }

    input UserInput {
        cuId: ID!
        username: String!
        password: String!
    }

    input AuthInput {
        username: String!
        password: String!
    }

    input UpdatePassword {
        username: String!
        password: String!
        newPassword: String!
    }

    # type Query {
    #     users: [User]
    # }
    
    type Mutation {
        userCreate(input: UserInput): User!
        userLogin(input: AuthInput!): UserPayload!
        userChangePassword(input: UpdatePassword!): User!
    }
`];

export const resolvers = {
    Query: {
        // users: async (_, __, { user, auth, dataSources }) => {
        //     if (!user && !auth) {
        //         throw new AuthenticationError("Not authenticated, login for extra info")
        //     }
        // }
    },
    Mutation: {
        userLogin: async (_, { input }, { dataSources }) => {
            try {
                const [user] = await dataSources.db.Auth.getUser(input.username)
                if (user != undefined) {
                    const match = await bcrypt.compare(input.password, user.password);
                    if (match === true) {
                        const resources = await dataSources.db.Auth.getResourceId(user.id);
                        const [resource] = resources.filter(rs => rs !== null)
                        const resourceId = resource.resourceId
                        const token = jwt.sign(
                            { id: user.id, cuId: resourceId, username: user.username },
                            process.env.SECRET,
                            { algorithm: "HS256", subject: `${user.id}`, expiresIn: "7d" }
                        );
                        return {
                            user: {
                                id: user.id,
                                cuId: resourceId,
                                username: user.username
                            },
                            authToken: token
                        }
                    } else {
                        throw new Error('wrong password? ')
                    }
                } else {
                    throw new Error('no such user')
                }
            } catch (error) {
                throw new AuthenticationError('User not signed up')
            }
        },
        userCreate: async (_, { input }, { user, auth, dataSources }) => {
            try {
                if (!user && !auth) {
                    throw new AuthenticationError("Not authenticated, login!")
                } else {
                    const allowed = await auth.canManage('System', user.id)
                    if (allowed[0].count > 0) {
                        const hash = await bcrypt.hash(input.password, 10);
                        const result = await dataSources.db.Auth.createUser(input.cuId, input.username, hash)
                        return result;
                    } else {
                        throw new AuthenticationError('You are not authorized')
                    }
                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'You are not authorized')
            }
        },
        userChangePassword: async (_, { input }, { user, dataSources }) => {
            try {
                if (user) {
                    const [userObj] = await dataSources.db.Auth.getUser(input.username)
                    const match = await bcrypt.compare(input.password, userObj.password);
                    if (match) {
                        const hash = await bcrypt.hash(input.newPassword, 10);
                        const result = await dataSources.db.Auth.changeUserPassword(input.username, hash);
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