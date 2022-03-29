import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type ContributorCommitment {
        id: ID!
        cuId: ID!
        contributorId: ID!
        startDate: String!
        commitment: Commitment
        cuCode: String!
        contributor: [Contributor]
    }

    enum Commitment {
        FullTime
        PartTime
        Variable
        Inactive
    }

    type Contributor {
        id: ID!
        name: String!
        forumHandle: String!
        discordHandle: String!
        twitterHandle: String!
        email: String!
    }

    type Query {
        contributorCommitments: [ContributorCommitment]
        contributorCommitment(filter: ContributorCommitmentFilter): [ContributorCommitment]
    }

    "Choose only one parameter from this list. Here you have the versatility of choosing the right argument according to your needs"
    input ContributorCommitmentFilter {
        id: ID
        cuId: ID
        contributorId: ID
        startDate: String
        commitment: Commitment
        cuCode: String
    }

`;

export const resolvers = {
    Query: {
        contributorCommitments: async (_, __, { dataSources }) => {
            return await dataSources.db.getContributorCommitments();
        },
        contributorCommitment: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getContributorCommitment(paramName, paramValue)
        }
    },
    ContributorCommitment: {
        contributor: async (parent, __, { dataSources }) => {
            const { contributorId } = parent;
            const result = await dataSources.db.getContributors();
            const contributor = result.filter(contributor => {
                return contributor.id === contributorId
            })
            return contributor;
        }
    }
}