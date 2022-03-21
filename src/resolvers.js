const resolvers = {
    Query: {
        // coreUnits: (parent, args, context, info) => {}
        coreUnits: async (_, __, { dataSources }) => {
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
}

export default resolvers;