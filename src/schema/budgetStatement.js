import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type BudgetStatement {
        id: Int!
        cuCode: String!
        month: String!
        comments: String
        budgetStatus: STATUS
        publicationURL: String!
        coreUnit: [CoreUnit]
    }

    enum STATUS {
        DRAFT
        FINAL
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