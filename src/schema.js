import { gql } from 'apollo-server-core'

const typeDefs = gql`

    type CoreUnit {
        code: String
        name: String
        # socialMediaChannels: SocialMediaChannels
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

export default typeDefs;