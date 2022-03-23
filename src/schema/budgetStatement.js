import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type BudgetStatement {
        id: ID!
        cuCode: String!
        month: String!
        comments: String
        budgetStatus: BudgetStatementStatus
        publicationURL: String!
    }

    enum BudgetStatementStatus {
        DRAFT
        FINAL
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

    type BudgetStatementPayments {
        id: ID!
        budgetStatementWalletId: ID!
        transactionDate: String!
        transactionId: String
        budgetStatementLineItemId: Int
        comments: String
    }

    extend type Query {
        budgetStatements(month: String): [BudgetStatement]
    }

`;

export const resolvers = {
    Query: {
        // coreUnits: (parent, args, context, info) => {}
        budgetStatements: async (_, __, { }) => {
            return null
        }

    }
}