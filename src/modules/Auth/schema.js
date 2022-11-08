import { gql, AuthenticationError } from "apollo-server-core";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config()

export const typeDefs = [gql`

    type User {
        id: ID
        username: String
        isActive: String
        roles: [Role]
    }

    type Role {
        id: ID
        name: String
        permissions: [String]
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

    type Query {
        users: [User]
    }
    
    type Mutation {
        userCreate(input: UserInput): User!
        userLogin(input: AuthInput!): UserPayload!
        userChangePassword(input: UpdatePassword!): User!
    }
`];

export const resolvers = {
    Query: {
        users: async (_, __, { user, auth, dataSources }) => {
            try {
                if (!user && !auth) {
                    throw new AuthenticationError("Not authenticated, login!")
                } else {
                    const allowed = await dataSources.db.Auth.canManage(user.id, 'System')
                    if (allowed[0].count > 0) {
                        const result = await dataSources.db.Auth.getUsers();
                        return parseToSchemaUser(result)
                    } else {
                        throw new AuthenticationError('You are not authorized to perform this query')
                    }

                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'You are not authorized to perform this query')
            }
        }
    },
    Mutation: {
        userLogin: async (_, { input }, { dataSources }) => {
            try {
                const [user] = await dataSources.db.Auth.getUser(input.username)
                if (user != undefined) {
                    const match = await bcrypt.compare(input.password, user.password);
                    if (match === true) {
                        const token = jwt.sign(
                            { id: user.id, username: user.username },
                            process.env.SECRET,
                            { algorithm: "HS256", subject: `${user.id}`, expiresIn: "7d" }
                        );
                        const result = await dataSources.db.Auth.getUsers(user.id);
                        const userObj = parseToSchemaUser(result)
                        return {
                            user: userObj[0],
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
                    const allowed = await dataSources.db.Auth.canManage(user.id, 'System')
                    if (allowed[0].count > 0) {
                        const [user] = await dataSources.db.Auth.getUser(input.username);
                        if (user === undefined) {
                            const hash = await bcrypt.hash(input.password, 10);
                            const result = await dataSources.db.Auth.createUser(input.cuId, input.username, hash)
                            return result;
                        } else {
                            throw new Error('username already taken, try a new one')
                        }
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

const parseToSchemaUser = (result) => {
    const usernames = result.map(user => user.username);
    let userObj = { id: '', username: '', isActive: '', roles: [] }
    const resultUsers = [];
    usernames.forEach((username, index) => {
        // If creating extra roles, we need to redo below 2 lines to automatically create role objects
        let role = { id: '', name: '', permissions: [] };
        let role2 = { id: '', name: '', permissions: [] };
        if (userObj.username !== username) {
            userObj.id = result[index].id
            userObj.username = username;
            // add isActive when ready in DB
            userObj.isActive = ''
            userObj.roles = []
            role.id = result[index].roleId
            role.name = result[index].roleName
            role.permissions = []
            usernames.forEach((userName, i) => {
                if (result[i].username === username && result[i].roleName === role.name) {
                    let str = `${result[i].resource}/${result[i].permission}`
                    if (result[i].resourceId !== null) {
                        str = str.concat(`/${result[i].resourceId}`)
                    }
                    role.permissions.push(str);
                } else if (result[i].username === username) {
                    role2.id = result[i].roleId
                    role2.name = result[i].roleName
                    let str = `${result[i].resource}/${result[i].permission}`
                    if (result[i].resourceId !== null) {
                        str = str.concat(`/${result[i].resourceId}`)
                    }
                    role2.permissions.push(str);
                }
            })
            userObj.roles.push(role)
            if(role2.id !== ''){
                userObj.roles.push(role2)
            }

            resultUsers.push({
                id: userObj.id,
                username: userObj.username,
                isActive: userObj.isActive,
                roles: userObj.roles
            })
        }
    });
    return resultUsers
}

/*
const parseToSchemaUser = (result) => {
    // concatenate permissions for each user
    const usernames = result.map(user => user.username);
    let userObj = { id: '', username: '', isActive: '', roles: { id: '', name: '', permissions: [] } }
    const resultUsers = [];
    usernames.forEach((username, index) => {
        if (userObj.username !== username) {
            userObj.id = result[index].id
            userObj.username = username;
            // add isActive when ready in DB
            userObj.isActive = ''
            userObj.roles.id = result[index].roleId
            userObj.roles.name = result[index].roleName
            userObj.roles.permissions = []
            usernames.forEach((usrName, i) => {
                if (result[i].username === username) {
                    let str = `${result[i].resource}/${result[i].permission}`
                    if (result[i].resourceId !== null) {
                        str = str.concat(`/${result[i].resourceId}`)
                    }

                    userObj.roles.permissions.push(str);
                }
            })

            resultUsers.push({
                id: userObj.id,
                username: userObj.username,
                isActive: userObj.isActive,
                roles: {
                    id: userObj.roles.id,
                    name: userObj.roles.name,
                    permissions: [...userObj.roles.permissions]
                }
            })

        }
    });
    // end concatenate permissions for each user
    return resultUsers
}


*/