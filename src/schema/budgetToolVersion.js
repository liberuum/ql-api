import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type BudgetToolVersion {
        id: ID!
        version: String!
        link: String!
    }

    extend type Query {
        budgetToolVersions: [BudgetToolVersion]
        latestBudgetToolVersion: [BudgetToolVersion]
    }

`

export const resolvers = {
    Query: {
        budgetToolVersions: async (_, __, { dataSources }) => {
            return await dataSources.db.getBudgetToolVersions()
        },
        latestBudgetToolVersion: async (_, __, {dataSources}) => {
            return await dataSources.db.getLatestBudgetToolVersion()
        }
    }
}