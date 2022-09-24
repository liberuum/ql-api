import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Query {
        currentTime: String!
    }
    
    type Error {
        message: String!
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