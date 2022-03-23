import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type ContributorCommitment {
        id: ID!
        cuCode: String!
        contributorId: ID!
        startDate: String!
        commitment: Commitment
    }

    enum Commitment {
        FULLTIME
        PARTTIME
        VARIABLE
        INACTIVE
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