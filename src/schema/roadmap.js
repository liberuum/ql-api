import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type Roadmap {
        id: Int!
        ownerCuCode: String
        roadMapCode: String
        roadMapName: String
        roadMapStatus: STATUS
    }

    enum STATUS {
        TODO
        INPROGRESS
        DONE
    }

    type Query {
        roadMaps: [Roadmap]
    }

`;

export const resolvers = {
    Query: {
        roadMaps: (_, __, {}) => {
            return null;
        }
    }
}