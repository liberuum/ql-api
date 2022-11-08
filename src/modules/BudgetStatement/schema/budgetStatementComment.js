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

    type Mutation {
        budgetStatementCommentCreate(input: BudgetStatementCommentInput): [BudgetStatementComment]
        budgetStatementCommentDelete(input: BudgetStatementCommentDeleteInput): [BudgetStatementComment]
    }

    input BudgetStatementCommentInput {
        budgetStatementId: ID!
        comment: String
        commentAuthorName: String
    }

    input BudgetStatementCommentDeleteInput {
        id: ID
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
    },
    Mutation: {
        budgetStatementCommentCreate: async (_, { input }, { user, auth, dataSources }) => {
            try {
                if (!user && !auth) {
                    throw new AuthenticationError("Not authenticated, login to create budget statment comments")
                } else {
                    const allowed = await dataSources.db.Auth.canUpdate(user.id, 'CoreUnit', user.cuId)
                    if (allowed[0].count > 0) {
                        if (input.length < 1) {
                            throw new Error('"No input data')
                        }
                        console.log(`adding comment to budgetStatement id: ${input.budgetStatementId}`);
                        // add to author table if user !exist
                        let author = await dataSources.db.BudgetStatement.getBudgetStatementCommentAuthor('name', input.commentAuthorName)
                        if (author.length < 1) {
                            author = await dataSources.db.BudgetStatement.addBudgetStatementCommentAuthor(input.commentAuthorName)
                        }
                        // add comment
                        const addedComment = await dataSources.db.BudgetStatement.addBudgetStatementComment(input.budgetStatementId, input.comment);
                        // get comment Id and user Id and add to comment_author table relationship
                        await dataSources.db.BudgetStatement.addCommentAuthor(addedComment[0].id, author[0].id)
                        return addedComment;
                    } else {
                        throw new AuthenticationError('You are not authorized to create budget statement comments')
                    }
                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'You are not authorized to update budgetStatements')
            }
        },
        budgetStatementCommentDelete: async (_, { input }, { user, auth, dataSources }) => {
            try {
                if (!user && !auth) {
                    throw new AuthenticationError("Not authenticated, login to create budget statment comments")
                } else {
                    const allowed = await dataSources.db.Auth.canUpdate(user.id, 'CoreUnit', user.cuId)
                    if (allowed[0].count > 0) {
                        if (input.length < 1) {
                            throw new Error('"No input data')
                        }
                        console.log(`deleting comment id: ${input.id}`);
                        return await dataSources.db.BudgetStatement.budgetStatementCommentDelete(input.id)
                    } else {
                        throw new AuthenticationError('You are not authorized to create budget statement comments')
                    }
                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'You are not authorized to update budgetStatements')
            }
        }
    }

}