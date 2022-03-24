import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type CoreUnit {
        id: ID!
        code: String
        name: String
    }

    type CoreUnitPayload {
        errorrs: [Error!]!
        coreUnit: CoreUnit
    }

    extend type Query {
        coreUnits: [CoreUnit],
        coreUnit(code: String): [CoreUnit],
    }

    type Mutation {
        addCoreUnit(input: CoreUnitInput!): CoreUnitPayload!
    }

    input CoreUnitInput {
        code: String!
        name: String!
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
        addCoreUnit: async (_, { input }, { dataSources }) => {
            let errors;
            let coreUnit;
            try {
                await dataSources.db.addCoreUnit(input.code, input.name)
                coreUnit = await dataSources.db.getCoreUnitById(input.code);
                return { errors, coreUnit: coreUnit[0] }
            } catch (error) {
                errors = error
                return { errors, coreUnit: '' }
            }

        }
    }
};
