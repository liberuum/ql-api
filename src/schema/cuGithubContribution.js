import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type CuGithubContribution {
        id: Int!
        cuCode: String!
        orgId: Int!
        repoId: Int
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