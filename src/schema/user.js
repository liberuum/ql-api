import { gql, AuthenticationError } from "apollo-server-core";
import { users } from './auth/data.js';
import jwt from "jsonwebtoken";

export const typeDefs = gql`

    type User {
        id: ID!
        cuId: ID!
        userName: String!
    }

    type UserPayload {
        errorrs: [Error!]!
        user: User
        authToken: String!
    }

    # Deleting logged in user. Needs to be changed to correct definition of who can delete who. 
    type UserDeletePayload {
        errors: [Error!]!
        deletedUserId: ID
    }


    input UserInput {
        userName: String!
        password: String!
    }

    input AuthInput {
        userName: String!
        password: String!
    }

    type Query {
        users: [User]
    }
    
    type Mutation {
        userCreate(input: UserInput): UserPayload!
        # userLogin(
        #     userLogin(input: AuthInput!): UserPayload
        # ): UserPayload!
        userLogin(input: AuthInput!): String
        userDelete: UserDeletePayload!
    }
`;

export const resolvers = {
    Query: {
        users: async (_, __, { user }) => {
            console.log('user context', user);
            if (!user) {
                throw new AuthenticationError("Not authenticated, login for extra info")
            }
            return users

        }
    },
    Mutation: {
        userLogin: (_, { input }, { }) => {
            try {
                const { id, cuId, roles } = users.find(
                    user => user.userName === input.userName && user.password === input.password
                );
                return jwt.sign(
                    { cuId, roles },
                    'SUPER_SECRET',
                    { algorithm: "HS256", subject: id, expiresIn: "1d" }
                )
            } catch {
                throw new AuthenticationError('User not signed up')
            }


        }

    }
};