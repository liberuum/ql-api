import { gql } from 'apollo-server-core'

const typeDefs = gql`

    type CoreUnit {
        "The Core Unit ID code"
        Code: String
        "The name of the Core Unit"
        Name: String
    }

    type Query {
        "Retrieve information for all Core Units, filterable using the fields below"
        coreUnits: [CoreUnit],
        "Retrieve information for a single Core Unit, use the argument field to enter Core Unit code"
        coreUnit(Code: String): [CoreUnit]
    }

    type Mutation {
        "Add a Core Unit to the schema"
        addCoreUnit(Code: String, Name: String): String
    }
`;

export default typeDefs;