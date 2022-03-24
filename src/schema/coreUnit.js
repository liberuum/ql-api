import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type CoreUnit {
        id: ID!
        code: String
        name: String
        socialMediaChannels: SocialMediaChannels
        budgetStatement: [BudgetStatement!]
    }

    extend type Query {
        coreUnits: [CoreUnit],
        coreUnit(code: String): [CoreUnit],
    }

    type Mutation {
        addCoreUnit(code: String, name: String): [CoreUnit]
    }

`;

export const resolvers = {
    Query: {
        // coreUnits: (parent, args, context, info) => {}
        coreUnits: async (_, __, { dataSources }) => {
            // console.log(await dataSources.db.getBudgetStatements())
            return await dataSources.db.getCoreUnits();
        },
        coreUnit: async (_, { code }, { dataSources }) => {
            return await dataSources.db.getCoreUnitById(code)
        }
    },
    Mutation: {
        addCoreUnit: async (_, { code, name }, { dataSources }) => {
            return await dataSources.db.addCoreUnit(code, name)
        }
    }
};
