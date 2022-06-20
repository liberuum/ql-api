import { gql } from 'apollo-server-core';

export const typeDefs = gql`

    type ViewData {
        key: String
        lastUpdate: DateTime
        value: JSON
    }

    type Query {
        viewDatas: [ViewData]
        viewData(filter: ViewDataFilter): [ViewData]
    }

    input ViewDataFilter {
        key: String
        lastUpdate: DateTime
        value: JSON
    } 


`;


export const resolvers = {
    Query: {
        viewDatas: async (_, __, { dataSources }) => {

        }
    }
}