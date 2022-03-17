const resolvers = {
    Query: {
        // coreUnits: (parent, args, context, info) => {}
        coreUnits: async (_, __, { dataSources }) => {
            return await dataSources.db.getCoreUnits();
        },
        coreUnit: async (_, { Code }, { dataSources }) => {
            return await dataSources.db.getCoreUnitById(Code)
        }
    },
    Mutation: {
        addCoreUnit: async (_, { Code, Name }, { dataSources }) => {
            return await dataSources.db.addCoreUnit(Code, Name)
        }
    }
}

export default resolvers;