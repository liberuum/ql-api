import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type ContributorCommitment {
        id: ID!
        cuId: ID!
        contributorId: ID!
        startDate: String!
        commitment: Commitment
        cuCode: String!
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
        contributorCommitment(cuCode: String): [ContributorCommitment]
    }

`;

export const resolvers = {
    Query: {
        contributorCommitments: async (_, __, { }) => {
            return null;
        },
        contributorCommitment: async (_, {cuCode}, {}) => {
            return null;
        }
    }
}