import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type CuMip {
        id: Int!
        mipCode: String!
        coreUnitId: Int!
        coreUnitCode: String!
        rfc: String!
        formalSubmission: String!
        accepted: String!
        rejected: String!
        Obsolete: String!
        mipStataus: STATUS!
    }

    enum STATUS {
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