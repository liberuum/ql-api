import { gql } from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema';
import _ from 'lodash'
import {
    typeDefs as CoreUnit,
    resolvers as CoreUnitResolvers
} from './coreUnit.js';
import {
    typeDefs as BudgetStatement,
    resolvers as BudgetStatementResolvers
} from './budgetStatement.js'

const typeDefs = gql`

    # Root Data Type. From here all other types connect. 
    type CoreUnit {
        code: String
        name: String
        socialMediaChannels: SocialMediaChannels
    }

    type SocialMediaChannels {
     id: Int!   
    }

    # 
    type BudgetStatement {
        id: Int!
        coreUnit: [CoreUnit]
        # // add all subtypes
    }

    type Query {
        coreUnits: [CoreUnit],
        coreUnit(code: String): [CoreUnit],
        budgetStatements(month: String): [BudgetStatement]
    }

    type Mutation {
        addCoreUnit(code: String, name: String): [CoreUnit]
    }
`;

const Query = gql`
    type Query
`

const resolvers = {
    Query: {

    }
}

const schema = makeExecutableSchema({
    typeDefs: [Query, CoreUnit, BudgetStatement],
    resolvers: _.merge(resolvers, CoreUnitResolvers, BudgetStatementResolvers)
})

export default schema;