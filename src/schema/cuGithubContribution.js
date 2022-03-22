import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type CuGithubContribution {
        id: ID!
        cuCode: String!
        orgId: ID!
        repoId: ID
    }

    type Query {
        cuGithubContribution: [CuGithubContribution]
    }

`;

export const resolvers = {
    Query: {
        cuGithubContribution: (_, __, {}) => {
            return null;
        }
    }
}