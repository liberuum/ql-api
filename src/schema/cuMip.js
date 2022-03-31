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
        mip39: [Mip39]
        mip40: [Mip40]
        mip41: [Mip41]
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
        mipId: ID!
        mip39Spn: Int!
        mipCode: String!
        cuName: String!
        sentenceSummary: String!
        paragraphSummary: String!
    }

    type Mip40 { 
        id: ID!
        cuMipId: ID!
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
        cuMipId: ID!
        facilitatorName: String
        discordHandle: String
        twitterHandle: String
        forumHandle: String
        github: String
    }

    input CuMipFilter {
        id: ID
        mipCode: String
        cuId: ID
        rfc: String
        formalSubmission: String
        accepted: String
        rejected: String
        obsolete: String
        mipStatus: CuMipStatus
    }

    extend type Query {
        cuMips: [CuMip]
        cuMip(filter: CuMipFilter): [CuMip]
    }
`;

export const resolvers = {
    Query: {
        // name: (parent, args, context, info) => {}
        cuMips: async (_, __, { dataSources }) => {
            return await dataSources.db.getMips()
        },
        cuMip: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose only one parameter"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getMip(paramName, paramValue)
        },

    },
    CuMip: {
        mip39: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getMip39s();
            const mips = result.filter(mip => {
                return mip.mipId === id;
            })
            return mips;
        },
        mip40: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getMip40s();
            const mips = result.filter(mip => {
                return mip.cuMipId === id;
            })
            return mips;
        },
        mip41: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getMip41s();
            const mips = result.filter(mip => {
                return mip.cuMipId === id;
            })
            return mips;

        }
    }
}