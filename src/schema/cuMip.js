import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type CuMip {
        id: ID!
        mipCode: String!
        coreUnitId: ID!
        coreUnitCode: String!
        rfc: String!
        formalSubmission: String!
        accepted: String!
        rejected: String!
        Obsolete: String!
        mipStataus: CuMipStatus!
    }

    enum CuMipStatus {
        RFC
        FORMAL_SUBMISSION
        ACCEPTED
        REJECTED
        OBSOLETE
    }

    extend type Query {
        cuMips: [CuMip]
        cuMip(mipCode: String): [CuMip]
    }
`;

export const resolvers = {
    Query: {
        // name: (parent, args, context, info) => {}
        cuMips: async (_, __, { }) => {
            return null
        },
        cuMip: async (_, {mipCode}, { }) => {
            // return cuMip with mipCode from db
            return null 
        },
        
    }
}