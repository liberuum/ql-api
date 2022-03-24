import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type Error {
        message: String!
    }

    extend type Query {
        currentTime: String!
    }

`

export const resolvers = {
    Query: {
        currentTime: (_, __, { }) => {
            const isoString = new Date().toISOString();
            return isoString.slice(11, 19);
        }

    }
};