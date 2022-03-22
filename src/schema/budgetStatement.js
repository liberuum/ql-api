import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type BudgetStatement {
        id: Int!
        cuCode: String!
        month: String!
        comments: String
        budgetStatus: STATUS
        publicationURL: String!
    }

    enum STATUS {
        DRAFT
        FINAL
    } 

    type BudgetStatementFTEs {
        id: Int!
        budgetStatementId: Int!
        month: String!
        ftes: Float!
    }

    type BudgetStatementMKRVest {
        id: Int!
        budgetStatementId: Int!
        vestingDate: String!
        mkrAmount: Float
        mkrAmountOld: Float
        comments: String
    }

    type BudgetStatementWallet {
        id: Int!
        budgetStatementId: Int!
        name: String
        address: String
        currentBalance: Float
        topupTransfer: Float
        comments: String
    }

    type BudgetStatementLineItem {
        id: Int!
        budgetStatementWalletId: Int!
        month: String!
        position: Int!
        group: String
        budgetCategory: String
        forecast: Float
        actual: Float
        comments: String
    }

    type BudgetStatementPayments {
        id: Int!
        budgetStatementWalletId: Int!
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