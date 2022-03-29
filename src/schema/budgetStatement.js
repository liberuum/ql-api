import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type BudgetStatement {
        id: ID!
        cuId: ID!
        month: String!
        comments: String
        budgetStatus: BudgetStatementStatus
        publicationUrl: String!
        cuCode: String!
        budgetStatementFTEs: [BudgetStatementFTEs]
        budgetStatementMKRVest: [BudgetStatementMKRVest]
        budgetStatementWallet: [BudgetStatementWallet]
    }

    enum BudgetStatementStatus {
        Final
        Draft
    } 

    type BudgetStatementFTEs {
        id: ID!
        budgetStatementId: ID!
        month: String!
        ftes: Float!
    }

    type BudgetStatementMKRVest {
        id: ID!
        budgetStatementId: ID!
        vestingDate: String!
        mkrAmount: Float
        mkrAmountOld: Float
        comments: String
    }

    type BudgetStatementWallet {
        id: ID!
        budgetStatementId: ID!
        name: String
        address: String
        currentBalance: Float
        topupTransfer: Float
        comments: String
        budgetStatementLineItem: [BudgetStatementLineItem]
        budgetStatementPayment: [BudgetStatementPayment]

    }

    type BudgetStatementLineItem {
        id: ID!
        budgetStatementWalletId: ID!
        month: String!
        position: Int!
        group: String
        budgetCategory: String
        forecast: Float
        actual: Float
        comments: String
    }

    type BudgetStatementPayment {
        id: ID!
        budgetStatementWalletId: ID!
        transactionDate: String!
        transactionId: String
        budgetStatementLineItemId: Int
        comments: String
    }

    extend type Query {
        budgetStatement(filter: BudgetStatementFilter): [BudgetStatement]
        budgetStatements: [BudgetStatement!]
    
    }

    type BudgetStatementPayload {
        errors: [Error!]!
        budgetStatement: BudgetStatement
    }

    type Mutation {
        budgetStatementAdd(input: BudgetStatementInput): BudgetStatementPayload!
        budgetStatementDelete: ID!
    }

    input BudgetStatementInput {
        cuId: ID!
        month: String!
        comments: String
        budgetStatus: BudgetStatementStatus
        publicationUrl: String!
        cuCode: String!
    }

    input BudgetStatementFilter {
        id: ID
        cuId: ID
        month: String
        comments: String
        budgetStatus: BudgetStatementStatus
        publicationUrl: String
        cuCode: String
    }

`;

export const resolvers = {
    Query: {
        // coreUnits: (parent, args, context, info) => {}
        budgetStatements: async (_, __, { dataSources }) => {
            return await dataSources.db.getBudgetStatements()
        },
        budgetStatement: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getBudgetStatement(paramName, paramValue)
        }

    },
    BudgetStatement: {

    },
    Mutation: {
        budgetStatementAdd: async (_, __, { dataSources }) => {
            return null;
        },
        budgetStatementDelete: async (_, __, { dataSources }) => {
            return null;
        }
    }
}