const MINUTE = 60;
export default {
    
    getBudgetStatements(limit, offset) {
        if (limit !== undefined && offset !== undefined) {
            return this.knex
                .select()
                .from('BudgetStatement')
                .limit(limit)
                .offset(offset)
                .orderBy('month', 'desc')
        } else {
            return this.knex
                .select('*')
                .from('BudgetStatement')
                .orderBy('month', 'desc')
        }
    },

    getBudgetStatementByCuId(cuId) {
        return this.knex('BudgetStatement').where('cuId', cuId)
    },

    getBudgetStatement(paramName, paramValue, secondParamName, secondParamValue) {
        if (secondParamName === undefined && secondParamValue === undefined) {
            return this.knex('BudgetStatement').where(`${paramName}`, paramValue);
        } else {
            return this.knex('BudgetStatement').where(`${paramName}`, paramValue).andWhere(`${secondParamName}`, secondParamValue)
        }
    },

    getAuditReports(budgetStatementId) {
        if (budgetStatementId === undefined) {
            return this.knex
                .select('*')
                .from('AuditReport')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('AuditReport').where(`budgetStatementId`, budgetStatementId)
        }
    },

    getAuditReport(paramName, paramValue) {
        return this.knex('AuditReport').where(`${paramName}`, paramValue)
    },

    getBudgetStatementFTEs(budgetStatementId) {
        if (budgetStatementId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementFtes')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('BudgetStatementFtes').where(`budgetStatementId`, budgetStatementId)
        }
    },

    getBudgetStatementFTE(paramName, paramValue) {
        return this.knex('BudgetStatementFtes').where(`${paramName}`, paramValue)
    },

    getBudgetStatementMKRVests(budgetStatementId) {
        if (budgetStatementId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementMkrVest')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('BudgetStatementMkrVest').where('budgetStatementId', budgetStatementId)
        }
    },

    getBudgetStatementMKRVest(paramName, paramValue) {
        return this.knex('BudgetStatementMkrVest').where(`${paramName}`, paramValue)
    },

    getBudgetStatementWallets(budgetStatementId) {
        if (budgetStatementId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementWallet')
                .orderBy('id')
        } else {
            return this.knex('BudgetStatementWallet').where('budgetStatementId', budgetStatementId)
        }
    },

    getBudgetStatementWallet(paramName, paramValue) {
        return this.knex('BudgetStatementWallet').where(`${paramName}`, paramValue)
    },

    getBudgetStatementLineItems(limit, offset) {
        if (offset != undefined && limit != undefined) {
            return this.knex
                .select()
                .from('BudgetStatementLineItem')
                .limit(limit)
                .offset(offset)
                .orderBy('month', 'desc')
                .cache(MINUTE)
        } else {
            return this.knex
                .select('*')
                .from('BudgetStatementLineItem')
                .orderBy('month', 'desc')
                .cache(MINUTE)
        }
    },

    getLineItemsByWalletId(walletId) {
        return this.knex('BudgetStatementLineItem').where(`budgetStatementWalletId`, walletId).orderBy('month', 'desc')
    },

    getBudgetStatementLineItem(paramName, paramValue, secondParamName, secondParamValue) {
        if (secondParamName === undefined && secondParamValue === undefined) {
            return this.knex('BudgetStatementLineItem').where(`${paramName}`, paramValue).orderBy('month', 'desc')
        } else {
            return this.knex('BudgetStatementLineItem').where(`${paramName}`, paramValue).andWhere(`${secondParamName}`, secondParamValue)
        }
    },

    getBudgetStatementPayments(budgetStatementWalletId) {
        if (budgetStatementWalletId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementPayment')
                .orderBy('id')
                .cache(MINUTE)

        } else {
            return this.knex('BudgetStatementPayment').where('budgetStatementWalletId', budgetStatementWalletId)
        }

    },

    getBudgetStatementPayment(paramName, paramValue) {
        return this.knex('BudgetStatementPayment').where(`${paramName}`, paramValue)
    },

    getBudgetStatementTransferRequests(budgetStatementWalletId) {
        if (budgetStatementWalletId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementTransferRequest')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('BudgetStatementTransferRequest').where('budgetStatementWalletId', budgetStatementWalletId)
        }
    },

    getBudgetStatementTransferRequest(paramName, paramValue) {
        return this.knex('BudgetStatementTransferRequest').where(`${paramName}`, paramValue)
    },


    // ------------------- Adding data --------------------------------

    addBatchtLineItems(rows) {
        const chunkSize = rows.lenght
        return this.knex.batchInsert('BudgetStatementLineItem', rows, chunkSize).returning('*');
    },

    addBatchBudgetStatements(rows) {
        const chunkSize = rows.lenght;
        return this.knex.batchInsert('BudgetStatement', rows, chunkSize).returning('*');
    },

    addBudgetStatementWallets(rows) {
        const chunkSize = rows.lenght;
        return this.knex.batchInsert('BudgetStatementWallet', rows, chunkSize).returning('*');
    },


    // ------------------- Updating data --------------------------------

    async updateLineItem(lineItem) {
        const id = lineItem.id;
        delete lineItem.id;
        return this.knex('BudgetStatementLineItem').where('id', id).update(lineItem).returning('*');
    },

    async batchUpdateLineItems(lineItems) {
        const trx = await this.knex.transaction();
        try {
            const result = await Promise.all(lineItems.map(lineItem => {
                let id = lineItem.id;
                delete lineItem.id
                return this.knex('BudgetStatementLineItem')
                    .where('id', id)
                    .update(lineItem)
                    .transacting(trx)
                    .returning('*')
            }));
            await trx.commit()
            return result.flat();
        } catch (error) {
            await trx.rollback()
        }
    },

    async batchDeleteLineItems(lineItems) {
        const trx = await this.knex.transaction();
        try {
            const result = await Promise.all(lineItems.map(lineItem => {
                let id = lineItem.id;
                delete lineItem.id
                return this.knex('BudgetStatementLineItem')
                    .where('id', id)
                    .del(lineItem)
                    .transacting(trx)
                    .returning('*')
            }));
            await trx.commit()
            return result.flat();
        } catch (error) {
            await trx.rollback()
        }
    },
};