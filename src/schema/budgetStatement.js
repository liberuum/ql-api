import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type BudgetStatement {
        id: ID!
        coreUnitId: ID!
        month: String!
        comments: String
        budgetStatus: BudgetStatementStatus
        publicationUrl: String!
        cuCode: String!
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
        budgetStatements(month: String): [BudgetStatement!]
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
        coreUnitId: ID!
        month: String!
        comments: String
        budgetStatus: BudgetStatementStatus
        publicationUrl: String!
        cuCode: String!
    }

`;

export const resolvers = {
    Query: {
        // coreUnits: (parent, args, context, info) => {}
        budgetStatements: async (_, __, { dataSources }) => {
            // console.log(await dataSources.db.getBudgetStatements())
            return await dataSources.db.getBudgetStatements()
        }

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