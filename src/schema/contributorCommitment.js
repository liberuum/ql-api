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