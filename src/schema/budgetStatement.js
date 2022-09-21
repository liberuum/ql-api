import { gql, AuthenticationError } from 'apollo-server-core';

export const typeDefs = gql`

    type BudgetStatement {
        "Auto generated id field"
        id: ID!
        "Auto generated id field from Core Unit table"
        cuId: ID!
        "Month of corresponding budget statement"
        month: String!
        "Optional comments field"
        comments: String
        "Status of the budgest statement (Draft/Final)"
        budgetStatus: BudgetStatus
        "Link to the complete publication of the budget statement"
        publicationUrl: String
        "Core Unit code as defined with the Core Units' MIP39"
        cuCode: String!
        mkrProgramLength: Float
        auditReport: [AuditReport]
        "Number of full-time employees in the corresponding budget statement"
        budgetStatementFTEs: [BudgetStatementFTEs]
        "Details on the amount of MKR vested in the corresponding budget statement"
        budgetStatementMKRVest: [BudgetStatementMKRVest]
        "Details on the wallets used for budget statement wallets"
        budgetStatementWallet: [BudgetStatementWallet]
    }

    enum BudgetStatus {
        Final
        Draft
        SubmittedToAuditor
        AwaitingCorrections
    } 

    type AuditReport {
        id: ID!
        budgetStatementId: ID!
        auditStatus: AuditStatus
        reportUrl: String
        timestamp: Timestamp
    }

    enum AuditStatus {
        Approved
        ApprovedWithComments
        NeedActionsBeforeApproval
        Escalated
    }

    type BudgetStatementFTEs {
        id: ID!
        budgetStatementId: ID
        month: String
        "Full-time employees"
        ftes: Float
    }

    type BudgetStatementMKRVest {
        id: ID!
        budgetStatementId: ID!
        vestingDate: String!
        "Current MKR amount"
        mkrAmount: Float
        "Previous MKR amount"
        mkrAmountOld: Float
        comments: String
    }

    type BudgetStatementWallet {
        id: ID!
        budgetStatementId: ID!
        "Wallet name"
        name: String
        "Wallet address"
        address: String
        "Current wallet balance (as defined within the budget statement"
        currentBalance: Float
        topupTransfer: Float
        comments: String
        "Retrieve breakdown of the line items that make up the corresponding budget statement"
        budgetStatementLineItem(offset: Int, limit: Int): [BudgetStatementLineItem]
        "Retrieve payment information for corresponding budget statement"
        budgetStatementPayment: [BudgetStatementPayment]
        budgetStatementTransferRequest: [BudgetStatementTransferRequest]

    }

    type BudgetStatementTransferRequest {
        id: ID!
        budgetStatementWalletId: ID!
        budgetStatementPaymentId: ID
        requestAmount: Float
        comments: String
    }

    type BudgetStatementLineItem {
        id: ID!
        budgetStatementWalletId: ID!
        month: String
        position: Int
        group: String
        budgetCategory: String
        forecast: Float
        actual: Float
        comments: String
        canonicalBudgetCategory: CanonicalBudgetCategory
        headcountExpense: Boolean
        budgetCap: Float
        payment: Float
    }

    enum CanonicalBudgetCategory {
        CompensationAndBenefits
        AdminExpense
        TravelAndEntertainment
        FreightAndDuties
        GasExpense
        GovernancePrograms
        HardwareExpense
        MarketingExpense
        ProfessionalServices
        SoftwareDevelopmentExpense
        SoftwareExpense
        Supplies
        TrainingExpense
        CommunityDevelopmentExpense
        Bonus
        ContingencyBuffer
    }

    type BudgetStatementPayment {
        id: ID!
        budgetStatementWalletId: ID!
        transactionDate: String!
        transactionId: String
        budgetStatementLineItemId: Int
        comments: String
    }

    type BudgetStatementPayload {
        errors: [Error]
        budgetStatement: [BudgetStatement]
    }

    input BudgetStatementInput {
        cuId: ID
        cuCode: String
        month: String
        comments: String
        budgetStatus: BudgetStatus
        publicationUrl: String
    }

    input BudgetStatementFilter {
        id: ID
        cuId: ID
        month: String
        comments: String
        budgetStatus: BudgetStatus
        publicationUrl: String
        cuCode: String
        mkrProgramLength: Float
    }

    input AuditReportFilter {
        id: ID
        budgetStatementId: ID
        auditStatus: AuditStatus
        reportUrl: String
        timestamp: Timestamp
    }

    input BudgetStatementFTEsFilter {
        id: ID
        budgetStatementId: ID
        month: String
        ftes: Float
    }

    input BudgetStatementMKRVestFilter {
        id: ID
        budgetStatementId: ID
        vestingDate: String
        mkrAmount: Float
        mkrAmountOld: Float
        comments: String
    }

    input BudgetStatementWalletFilter {
        id: ID
        budgetStatementId: ID
        name: String
        address: String
        currentBalance: Float
        topupTransfer: Float
        comments: String
    }

    input BudgetStatementTransferRequestFilter {
        budgetStatementWalletId: ID!
        budgetStatementPaymentId: ID
        requestAmount: Float
    }

    input BudgetStatementLineItemFilter {
        id: ID
        budgetStatementWalletId: ID
        month: String
        position: Int
        group: String
        budgetCategory: String
        canonicalBudgetCategory: CanonicalBudgetCategory
        forecast: Float
        actual: Float
        comments: String
        budgetCap: Float
    }

    input BudgetStatementPaymentFilter {
        id: ID
        budgetStatementWalletId: ID
        transactionDate: String
        transactionId: String
        budgetStatementLineItemId: Int
        comments: String
    }

    extend type Query {
        budgetStatement(filter: BudgetStatementFilter): [BudgetStatement]
        budgetStatements(limit: Int, offset: Int): [BudgetStatement!]
        auditReport(filter: AuditReportFilter): [AuditReport]
        auditReports: [AuditReport]
        budgetStatementFTEs: [BudgetStatementFTEs]
        budgetStatementFTE(filter: BudgetStatementFTEsFilter): [BudgetStatementFTEs]
        budgetStatementMKRVests: [BudgetStatementMKRVest]
        budgetStatementMKRVest(filter: BudgetStatementMKRVestFilter): [BudgetStatementMKRVest]
        budgetStatementWallets: [BudgetStatementWallet]
        budgetStatementWallet(filter: BudgetStatementWalletFilter): [BudgetStatementWallet]
        budgetStatementLineItems(limit: Int, offset: Int): [BudgetStatementLineItem]
        budgetStatementLineItem(filter: BudgetStatementLineItemFilter): [BudgetStatementLineItem]
        budgetStatementPayments: [BudgetStatementPayment]
        budgetStatementPayment(filter: BudgetStatementPaymentFilter): [BudgetStatementPayment]
        budgetStatementTransferRequests: [BudgetStatementTransferRequest]
        budgetStatementTransferRequest(filter: BudgetStatementTransferRequestFilter): [BudgetStatementTransferRequest]
    }

    type Mutation {
        budgetStatementsBatchAdd(input: [BudgetStatementBatchAddInput]): [BudgetStatement]
        budgetLineItemsBatchAdd(input: [LineItemsBatchAddInput]): [BudgetStatementLineItem]
        budgetLineItemsBatchDelete(input: [LineItemsBatchDeleteInput]): [BudgetStatementLineItem]
        budgetStatementWalletBatchAdd(input: [BudgetStatementWalletBatchAddInput]): [BudgetStatementWallet]
    }

    input LineItemsBatchAddInput {
        budgetStatementWalletId: ID!
        month: String
        position: Int
        group: String
        budgetCategory: String
        forecast: Float
        actual: Float
        comments: String
        canonicalBudgetCategory: String
        headcountExpense: Boolean
        budgetCap: Float
        payment: Float
    }

    input LineItemsBatchDeleteInput {
        id: ID
        budgetStatementWalletId: ID
        month: String
        position: Int
        group: String
        budgetCategory: String
        forecast: Float
        actual: Float
        comments: String
        canonicalBudgetCategory: String
        headcountExpense: Boolean
    }

    input BudgetStatementBatchAddInput {
        cuId: ID
        month: String
        comments: String
        budgetStatus: BudgetStatus
        publicationUrl: String
        cuCode: String
    }

    input BudgetStatementWalletBatchAddInput {
        budgetStatementId: ID!
        name: String
        address: String
        currentBalance: Float
        topupTransfer: Float
        comments: String
    }

`;

export const resolvers = {
    Query: {
        // coreUnits: (parent, args, context, info) => {}
        budgetStatements: async (_, filter, { dataSources }) => {
            return await dataSources.db.getBudgetStatements(filter.limit, filter.offset)
        },
        budgetStatement: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 2) {
                throw "Choose no more than 2 parameters"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            const secondParamName = queryParams[1];
            const secondParamValue = filter[queryParams[1]];
            return await dataSources.db.getBudgetStatement(paramName, paramValue, secondParamName, secondParamValue)
        },
        auditReports: async (_, __, { dataSources }) => {
            return await dataSources.db.getAuditReports();
        },
        auditReport: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getAuditReport(paramName, paramValue)
        },
        budgetStatementFTEs: async (_, __, { dataSources }) => {
            return await dataSources.db.getBudgetStatementFTEs();
        },
        budgetStatementFTE: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getBudgetStatementFTE(paramName, paramValue)
        },
        budgetStatementMKRVests: async (_, __, { dataSources }) => {
            return await dataSources.db.getBudgetStatementMKRVests();
        },
        budgetStatementMKRVest: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getBudgetStatementMKRVest(paramName, paramValue)
        },
        budgetStatementWallets: async (_, __, { dataSources }) => {
            return await dataSources.db.getBudgetStatementWallets();
        },
        budgetStatementWallet: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getBudgetStatementWallet(paramName, paramValue)
        },
        budgetStatementLineItems: async (_, filter, { dataSources }) => {
            return await dataSources.db.getBudgetStatementLineItems(filter.limit, filter.offset);
        },
        budgetStatementLineItem: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 2) {
                throw "Choose no more than 2 parameters"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            const secondParamName = queryParams[1];
            const secondParamValue = filter[queryParams[1]];
            return await dataSources.db.getBudgetStatementLineItem(paramName, paramValue, secondParamName, secondParamValue)
        },
        budgetStatementPayments: async (_, __, { dataSources }) => {
            return await dataSources.db.getBudgetStatementPayments();
        },
        budgetStatementPayment: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getBudgetStatementPayment(paramName, paramValue)
        },
        budgetStatementTransferRequests: async (_, __, { dataSources }) => {
            return await dataSources.db.getBudgetStatementTransferRequests()
        },
        budgetStatementTransferRequest: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getBudgetStatementTransferRequest(paramName, paramValue)
        }

    },
    BudgetStatement: {
        auditReport: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getAuditReports(id);
            return result;
        },
        budgetStatementFTEs: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getBudgetStatementFTEs(id);
            return result
        },
        budgetStatementMKRVest: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getBudgetStatementMKRVests(id)
            return result;
        },
        budgetStatementWallet: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getBudgetStatementWallets(id);
            return result;
        }
    },
    BudgetStatementWallet: {
        budgetStatementLineItem: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getLineItemsByWalletId(id);
            return result;
        },
        budgetStatementPayment: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getBudgetStatementPayments(id);
            return result;
        },
        budgetStatementTransferRequest: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getBudgetStatementTransferRequests(id);
            return result;
        }
    },
    Mutation: {
        budgetStatementsBatchAdd: async (_, { input }, { user, auth, dataSources }) => { // this one
            try {
                if (!user && !auth) {
                    throw new AuthenticationError("Not authenticated, login to update budgetStatements")
                } else {
                    const allowed = await auth.canUpdate('CoreUnit', user.cuId)
                    if (allowed[0].count > 0) {
                        if (input.length < 1) {
                            throw new Error('"No input data')
                        }
                        console.log(`adding ${input.length} budgetStatements to CU ${user.cuId}`)
                        const result = await dataSources.db.addBatchBudgetStatements(input);
                        return result
                    } else {
                        throw new AuthenticationError('You are not authorized to update budgetStatements')
                    }
                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'You are not authorized to update budgetStatements')
            }


        },
        budgetLineItemsBatchAdd: async (_, { input }, { user, auth, dataSources }) => { // this one
            try {
                if (!user && !auth) {
                    throw new AuthenticationError("Not authenticated, login to update budgetLineItems")
                } else {
                    const allowed = await auth.canUpdate('CoreUnit', user.cuId)
                    if (allowed[0].count > 0) {
                        console.log(`adding ${input.length} line items to CU ${user.cuId}`,)
                        const result = await dataSources.db.addBatchtLineItems(input)
                        return result;
                    } else {
                        throw new AuthenticationError('You are not authorized to update budgetLineItems')
                    }
                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'You are not authorized to update budgetLineItems')
            }
        },
        budgetLineItemsBatchDelete: async (_, { input }, { user, auth, dataSources }) => { // this one
            try {
                if (!user && !auth) {
                    throw new AuthenticationError("Not authenticated, login to delete budgetLineItems")
                } else {
                    const allowed = await auth.canUpdate('CoreUnit', user.cuId)
                    if (allowed[0].count > 0) {
                        console.log(`deleting ${input.length} line items from CU ${user.cuId}`);
                        return await dataSources.db.batchDeleteLineItems(input)
                    } else {
                        throw new AuthenticationError('You are not authorized to delete budgetLineItems')
                    }
                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'You are not authorized to delete budgetLineItems')
            }

        },
        budgetStatementWalletBatchAdd: async (_, { input }, { user, auth, dataSources }) => { // this one
            try {
                if (!user && !auth) {
                    throw new AuthenticationError("Not authenticated, login to update budgetStatementWallets")
                } else {
                    const allowed = await auth.canUpdate('CoreUnit', user.cuId)
                    if (allowed[0].count > 0) {
                        console.log(`Adding ${input.length} wallets to CU ${user.cuId}`)
                        return await dataSources.db.addBudgetStatementWallets(input);
                    } else {
                        throw new AuthenticationError('You are not authorized to update budgetStatementWallets')
                    }
                }
            } catch (error) {
                throw new AuthenticationError(error ? error : 'You are not authorized to update budgetStatementWallets')
            }
        }
    }
}