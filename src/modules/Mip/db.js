const MINUTE = 60;
export default {

    getMips(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('CuMip')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('CuMip').where('cuId', cuId)
        }
    },

    getMip(paramName, paramValue) {
        return this.knex('CuMip').where(`${paramName}`, paramValue)
    },

    getMipReplaces(newMip) {
        if (newMip === undefined) {
            return this.knex
                .select('*')
                .from('MipReplaces')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('MipReplaces').where('newMip', newMip)
        }
    },

    getMipReplace(paramName, paramValue) {
        return this.knex('MipReplaces').where(`${paramName}`, paramValue);
    },

    getMip39s(mipId) {
        if (mipId === undefined) {
            return this.knex
                .select('*')
                .from('Mip39')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip39').where('mipId', mipId)
        }
    },

    getMip39(paramName, paramValue) {
        return this.knex('Mip39').where(`${paramName}`, paramValue)
    },

    getMip40s(cuMipId) {
        if (cuMipId === undefined) {
            return this.knex
                .select('*')
                .from('Mip40')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip40').where('cuMipId', cuMipId)
        }
    },

    getMip40(paramName, paramValue) {
        return this.knex('Mip40').where(`${paramName}`, paramValue)
    },

    getMip40BudgetPeriods(mip40Id) {
        if (mip40Id === undefined) {
            return this.knex
                .select('*')
                .from('Mip40BudgetPeriod')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip40BudgetPeriod').where('mip40Id', mip40Id)
        }
    },

    getMip40BudgetPeriod(paramName, paramValue) {
        return this.knex('Mip40BudgetPeriod').where(`${paramName}`, paramValue)
    },

    getMip40Wallets(mip40Id) {
        if (mip40Id === undefined) {
            return this.knex
                .select('*')
                .from('Mip40Wallet')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip40Wallet').where('mip40Id', mip40Id)
        }
    },

    getMip40Wallet(paramName, paramValue) {
        return this.knex('Mip40Wallet').where(`${paramName}`, paramValue)
    },

    getMip40BudgetLineItems(mip40WalletId) {
        if (mip40WalletId === undefined) {
            return this.knex
                .select('*')
                .from('Mip40BudgetLineItem')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip40BudgetLineItem').where('mip40WalletId', mip40WalletId)
        }
    },

    getMip40BudgetLineItem(paramName, paramValue) {
        return this.knex('Mip40BudgetLineItem').where(`${paramName}`, paramValue)
    },

    getMip41s(cuMipId) {
        if (cuMipId === undefined) {
            return this.knex
                .select('*')
                .from('Mip41')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip41').where('cuMipId', cuMipId)
        }
    },

    getMip41(paramName, paramValue) {
        return this.knex('Mip41').where(`${paramName}`, paramValue)
    },

};