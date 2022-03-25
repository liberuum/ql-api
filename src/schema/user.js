import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type User {
        firstName: String
        lastName: String
        userName: String!
        password: String!
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

    type Mutation {
        userCreate(
            userCreate(input: UserInput): UserPayload!
        ): UserPayload!

        userLogin(
            userLogin(input: AuthInput!): UserPayload
        ): UserPayload!

        userDelete: UserDeletePayload!
    }

    input UserInput {
        firstName: String
        lastName: String
        userName: String!
        password: String!
    }

    input AuthInput {
        userName: String!
        password: String!
    }



`