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
        mipUrl: String
        mipTitle: String
        forumUrl: String
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
        Withdrawn
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
        mip40BudgetPeriod: [Mip40BudgetPeriod]
        mip40Wallet: [Mip40Wallet]
    }

    type Mip40BudgetPeriod {
        id: ID!
        mip40Id: ID!
        budgetPeriodStart: String!
        budgetPeriodEnd: String!
        ftes: Float!
    }

    type Mip40BudgetLineItem {
        id: ID!
        mip40WalletId: ID
        position: Int!
        budgetCategory: String!
        budgetCap: Float!
        canonicalBudgetCategory: CanonicalBudgetCategory
        group: String
        headCountExpense: Boolean
    }

    enum CanonicalBudgetCategory {
        CompensationAndBenefits
        AdminExpense
        TravelAndEntertainment
        FreightAndDuties
        GasExpense
        GovernancePrograms
        HardwareExpense
        MarketingExpense
        ProfessionalServices
        SoftwareDevelopmentExpense
        SoftwareExpense
        Supplies
        TrainingExpense
        CommunityDevelopmentExpense
    }

    type Mip40Wallet {
        id: ID!
        mip40Id: ID!
        address: String!
        name: String!
        signersTotal: Int!
        signersRequired: Int!
        clawbackLimit: Float
        mip40BudgetLineItem: [Mip40BudgetLineItem]
    }

    type Mip41 {
        id: ID!
        cuMipId: ID!
        contributorId: ID
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

    input Mip39Filter {
        id: ID
        mipId: ID
        mip39Spn: Int
        mipCode: String
        cuName: String
        sentenceSummary: String
        paragraphSummary: String
    }

    input Mip40Filter {
        id: ID
        cuMipId: ID
    }

    input Mip40BudgetPeriodFilter {
        id: ID
        mip40Id: ID
        budgetPeriodStart: String
        budgetPeriodEnd: String
        ftes: Int
    }

    input Mip40BudgetLineItemFilter {
        id: ID
        mip40WalletId: ID
        position: Int
        budgetCategory: String
        budgetCap: Int
        canonicalBudgetCategory: String
        group: String
        headCountExpense: Boolean
    }

    input Mip40WalletFilter{
        id: ID
        mip40Id: ID
        address: String
        name: String
        signersTotal: Int
        signersRequired: Int
        clawbackLimit: Float
    }

    input Mip41Filter {
        id: ID
        cuMipId: ID
        contributorId: ID
        facilitatorName: String
        discordHandle: String
        twitterHandle: String
        forumHandle: String
        github: String
    }

    extend type Query {
        cuMips: [CuMip]
        cuMip(filter: CuMipFilter): [CuMip]
        mip39s: [Mip39]
        mip39(filter: Mip39Filter): [Mip39]
        mip40s: [Mip40]
        mip40(filter: Mip40Filter): [Mip40]
        mip40BudgetPeriods: [Mip40BudgetPeriod]
        mip40BudgetPeriod(filter: Mip40BudgetPeriodFilter): [Mip40BudgetPeriod]
        mip40BudgetLineItems: [Mip40BudgetLineItem]
        mip40BudgetLineItem(filter: Mip40BudgetLineItemFilter): [Mip40BudgetLineItem]
        mip40Wallets: [Mip40Wallet]
        mip40Wallet(filter: Mip40WalletFilter): [Mip40Wallet]
        mip41s: [Mip41],
        mip41(filter: Mip41Filter): [Mip41]
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
        mip39s: async (_, __, { dataSources }) => {
            return await dataSources.db.getMip39s()
        },
        mip39: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose only one parameter"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getMip39(paramName, paramValue)
        },
        mip40s: async (_, __, { dataSources }) => {
            return dataSources.db.getMip40s()
        },
        mip40: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose only one parameter"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getMip40(paramName, paramValue)
        },
        mip40BudgetPeriods: async (_, __, { dataSources }) => {
            return dataSources.db.getMip40BudgetPeriods()
        },
        mip40BudgetPeriod: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose only one parameter"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getMip40BudgetPeriod(paramName, paramValue)
        },
        mip40BudgetLineItems: async (_, __, { dataSources }) => {
            return await dataSources.db.getMip40BudgetLineItems()
        },
        mip40BudgetLineItem: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose only one parameter"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getMip40BudgetLineItem(paramName, paramValue)
        },
        mip40Wallets: async (_, __, { dataSources }) => {
            return await dataSources.db.getMip40Wallets()
        },
        mip40Wallet: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose only one parameter"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getMip40Wallet(paramName, paramValue)
        },
        mip41s: async (_, __, { dataSources }) => {
            return await dataSources.db.getMip41s()
        },
        mip41: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose only one parameter"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getMip41(paramName, paramValue)
        }

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
    },
    Mip40: {
        mip40BudgetPeriod: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getMip40BudgetPeriods();
            const mip40BudgetPeriods = result.filter(budgetPeriod => {
                return budgetPeriod.mip40Id === id;
            })
            return mip40BudgetPeriods;
        },
        mip40Wallet: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getMip40Wallets();
            const mip40Wallets = result.filter(mip40wallet => {
                return mip40wallet.mip40Id === id;
            })
            return mip40Wallets;
        }
    },
    Mip40Wallet: {
        mip40BudgetLineItem: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getMip40BudgetLineItems()
            const lineItems = result.filter(lineItem => {
                return lineItem.mip40WalletId === id;
            })
            return lineItems;

        }
    }
}