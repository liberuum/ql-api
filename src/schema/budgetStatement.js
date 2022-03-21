import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type BudgetStatement {
        id: Int!
        coreUnit: [CoreUnit]
        # // add all subtypes
    }

    extend type Query {
        budgetStatements(month: String): [BudgetStatement]
    }

`;

export const resolvers = {
    Query: {
        // coreUnits: (parent, args, context, info) => {}
        budgetStatements: async (_, __, { }) => {
            return 'null'
        }

    }
}