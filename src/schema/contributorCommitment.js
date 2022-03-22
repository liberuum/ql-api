import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type ContributorCommitment {
        id: Int!
        cuCode: String!
        contributorId: Int!
        startDate: String!
        commitment: COMMITMENT
    }

    enum COMMITMENT {
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