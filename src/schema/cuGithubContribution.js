import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type CuGithubContribution {
        id: ID!
        cuCode: String!
        orgId: ID!
        repoId: ID
    }

    type GithubOrg {
        id: ID!
        orgId: Int!
        org: String!
        githubUrl: String!
    }

    type GithubRepo {
        id: ID!
        orgId: Int!
        repo: String!
        githubUrl: String!
    }

    type MakerGithubEcosystem {
        id: ID!
        makerRepoId: Int!
        cuGithubRepoId: Int!
        date: String!
        url: String!
        org: Int!
        repo: Int!
        uniqueContributors: Int!
        commits4w: Int!
        totalStars: Int!
    }

    type Query {
        cuGithubContribution: [CuGithubContribution]
    }

`;

export const resolvers = {
    Query: {
        cuGithubContribution: (_, __, { }) => {
            return null;
        }
    }
}