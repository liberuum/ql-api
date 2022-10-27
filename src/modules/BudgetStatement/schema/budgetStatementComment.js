import { gql, AuthenticationError } from 'apollo-server-core';

export const typeDefs = [gql`

    type BudgetStatementComment {
        id: ID!
        budgetStatementId: ID!
        timestamp: DateTime
        comment: String
        commentAuthor: [BudgetStatementCommentAuthor]
    }

    type BudgetStatementCommentAuthor {
        id: ID!
        name: String
    }

    extend type BudgetStatement {
        comments: [BudgetStatementComment]
    }

    input BudgetStatementCommentFilter {
        id: ID
        budgetStatementId: ID
        timestamp: DateTime
    }

    input BudgetStatementCommentAuthorFilter {
        id: ID
        name: String
    }

    extend type Query {
        budgetStatementComments: [BudgetStatementComment]
        budgetStatementComment(filter: BudgetStatementCommentFilter): [BudgetStatementComment]
        budgetStatementCommentAuthors: [BudgetStatementCommentAuthor]
        budgetStatementCommentAuthor(filter: BudgetStatementCommentAuthorFilter): [BudgetStatementCommentAuthor]
    }

`];


export const resolvers = {
    Query: {
        budgetStatementComments: async (_, __, { dataSources }) => {
            return await dataSources.db.BudgetStatement.getBudgetStatementComments()
        },
        budgetStatementComment: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 2) {
                throw "Choose no more than 2 parameters"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            const secondParamName = queryParams[1];
            const secondParamValue = filter[queryParams[1]];
            return await dataSources.db.BudgetStatement.getBudgetStatementComment(paramName, paramValue, secondParamName, secondParamValue)
        },
        budgetStatementCommentAuthors: async (_, __, { dataSources }) => {
            return await dataSources.db.BudgetStatement.getBudgetStatementCommentAuthors()
        },
        budgetStatementCommentAuthor: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 2) {
                throw "Choose no more than 2 parameters"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            const secondParamName = queryParams[1];
            const secondParamValue = filter[queryParams[1]];
            return await dataSources.db.BudgetStatement.getBudgetStatementCommentAuthor(paramName, paramValue, secondParamName, secondParamValue)
        }
    },
    BudgetStatement: {
        comments: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.BudgetStatement.getBudgetStatementComments(id);
            return result;
        },
    },
    BudgetStatementComment: {
        commentAuthor: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const [comment_author] = await dataSources.db.BudgetStatement.getBsComment_BsAuthor(id);
            if (comment_author?.bsCommentAuthorId !== undefined) {
                return await dataSources.db.BudgetStatement.getBudgetStatementCommentAuthor('id', comment_author.bsCommentAuthorId)
            } else {
                return []
            }
        }
    }

}