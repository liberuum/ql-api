import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type CuGithubContribution {
        id: ID!
        cuId: ID
        orgId: ID
        repoId: ID
        githubOrg: [GithubOrg]
        githubRepo: [GithubRepo]
    }

    type GithubOrg {
        id: ID!
        org: String!
        githubUrl: String!
    }

    type GithubRepo {
        id: ID!
        repo: String!
        githubUrl: String!
    }

    type MakerGithubEcosystem {
        id: ID!
        makerRepoId: ID!
        cuGithubRepoId: ID!
        date: String!
        url: String!
        org: Int!
        repo: Int!
        uniqueContributors: Int!
        commits4w: Int!
        totalStars: Int!
    }

    input CuGithubContributionFilter {
        id: ID!
        cuId: ID
        orgId: ID
        repoId: ID
    }

    input GithubOrgFilter {
        id: ID
        org: String
        githubUrl: String
    }

    input GithubRepoFilter {
        id: ID
        repo: String
        githubUrl: String
    }

    input MakerGithubEcosystemFilter {
        id: ID
        makerRepoId: ID
        cuGithubRepoId: ID
        date: String
        url: String
        org: Int
        repo: Int
        uniqueContributors: Int
        commits4w: Int
        totalStars: Int
    }

    type Query {
        cuGithubContributions: [CuGithubContribution]
        cuGithubContribution(filter: CuGithubContributionFilter): [CuGithubContribution]
        githubOrgs: [GithubOrg]
        githubOrg(filter: GithubOrgFilter): [GithubOrg]
        githubRepos: [GithubRepo]
        githubRepo(filter: GithubRepoFilter): [GithubRepo]
        makerGithubEcosystemAll: [MakerGithubEcosystem]
        makerGithubEcosystem(filter: MakerGithubEcosystemFilter): [MakerGithubEcosystem]

    }

`;

export const resolvers = {
    Query: {
        cuGithubContributions: async (_, __, { dataSources }) => {
            return await dataSources.db.CoreUnit.getCuGithubContributions()
        },
        cuGithubContribution: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.CoreUnit.getCuGithubContribution(paramName, paramValue)
        },
        githubOrgs: async (_, __, { dataSources }) => {
            return dataSources.db.CoreUnit.getGithubOrgs()
        },
        githubOrg: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.CoreUnit.getGithubOrg(paramName, paramValue)
        },
        githubRepos: async (_, __, { dataSources }) => {
            return await dataSources.db.CoreUnit.getGithubRepos()
        },
        githubRepo: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.CoreUnit.getGithubRepo(paramName, paramValue)
        },
        makerGithubEcosystemAll: async (_, __, { dataSources }) => {
            return await dataSources.db.CoreUnit.getMakerGithubEcosystemAll()
        },
        makerGithubEcosystem: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.CoreUnit.getMakerGithubEcosystem(paramName, paramValue)
        }
    },
    CuGithubContribution: {
        githubOrg: async (parent, __, { dataSources }) => {
            const { orgId } = parent;
            const result = await dataSources.db.CoreUnit.getGithubOrgs(orgId);
            return result
        },
        githubRepo: async (parent, __, { dataSources }) => {
            const { repoId } = parent;
            const result = await dataSources.db.CoreUnit.getGithubRepos(repoId);
            return result;
        }
    }
}