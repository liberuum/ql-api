import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type CuMip {
        id: ID!
        mipCode: String
        cuId: ID
        rfc: String
        formalSubmission: String
        accepted: String
        rejected: String
        obsolete: String
        mipStatus: CuMipStatus
    }

    enum CuMipStatus {
        RFC
        FORMAL SUBMISSION
        Accepted
        Rejected
        Obsolete
    }

    type Mip39 {
        id: ID!
        mip39Spn: Int!
        mipCode: String!
        cuName: String!
        sentenceSummary: String!
        paragraphSummary: String!
    }

    type Mip40 { 
        id: ID!
        mip40Spn: Int!
        mipCode: String!
    }

    type Mip40BudgetPeriod {
        id: ID!
        mip40Spn: Int!
        budgetPeriodStart: String!
        budgetPeriodEnd: String!
        ftes: Int!
    }

    type Mip40BudgetLineItem {
        id: ID!
        budgetPeriodId: ID!
        position: Int!
        budgetCategory: String!
        budgetCap: Float!
    }

    type Mip40Wallet {
        id: ID!
        mip40Spn: Int!
        address: String!
        name: String!
        signersTotal: Int!
        signersRequired: Int!
        clawBackLimit: Float!
    }

    type Mip41 {
        id: ID!
        mip41Spn: String!
        mipCode: String!
        facilitatorName: String!
        discordHandle: String!
        twitterHandle: String!
        forumHandle: String!
        github: String!
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