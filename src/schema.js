import { gql } from 'apollo-server-core'

const typeDefs = gql`

    type CoreUnit {
        Code: String
        Name: String
    }

    type Query {
        coreUnits: [CoreUnit],
        coreUnit(Code: String): [CoreUnit]
    }

    type Mutation {
        addCoreUnit(Code: String, Name: String): String
    }
`;

export default typeDefs;