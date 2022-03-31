import { SQLDataSource } from "datasource-sql";

const MINUTE = 60;

class EcosystemDatabase extends SQLDataSource {
    getCoreUnits() {
        return this.knex
            .select('*')
            .from('CoreUnit')
            .orderBy('code')
            .cache(MINUTE)
    };

    getCoreUnit(paramName, paramValue) {
        return this.knex('CoreUnit').where(`${paramName}`, paramValue)
    }

    addCoreUnit(code, name) {
        return this.knex('CoreUnit').insert({ code: code, name: name })
    }

    getBudgetStatements() {
        return this.knex
            .select('*')
            .from('BudgetStatement')
            .orderBy('id')
            .cache(MINUTE)
    }
    getBudgetStatement(paramName, paramValue) {
        return this.knex('BudgetStatement').where(`${paramName}`, paramValue)
    }

    getBudgetStatementFTEs() {
        return this.knex
            .select('*')
            .from('BudgetStatementFtes')
            .orderBy('id')
            .cache(MINUTE)
    }

    getBudgetStatementFTE(paramName, paramValue) {
        return this.knex('BudgetStatementFtes').where(`${paramName}`, paramValue)
    }

    getBudgetStatementMKRVests() {
        return this.knex
            .select('*')
            .from('BudgetStatementMkrVest')
            .orderBy('id')
            .cache(MINUTE)
    }

    getBudgetStatementMKRVest(paramName, paramValue) {
        return this.knex('BudgetStatementMkrVest').where(`${paramName}`, paramValue)
    }

    getBudgetStatementWallets() {
        return this.knex
            .select('*')
            .from('BudgetStatementWallet')
            .orderBy('id')
            .cache(MINUTE)
    }

    getBudgetStatementWallet(paramName, paramValue) {
        return this.knex('BudgetStatementWallet').where(`${paramName}`, paramValue)
    }

    getBudgetStatementLineItems() {
        return this.knex
            .select('*')
            .from('BudgetStatementLineItem')
            .orderBy('id')
            .cache(MINUTE)
    }

    getBudgetStatementLineItem(paramName, paramValue) {
        return this.knex('BudgetStatementLineItem').where(`${paramName}`, paramValue)
    }

    getBudgetStatementPayments() {
        return this.knex
            .select('*')
            .from('BudgetStatementPayment')
            .orderBy('id')
            .cache(MINUTE)
    }

    getBudgetStatementPayment(paramName, paramValue) {
        return this.knex('BudgetStatementPayment').where(`${paramName}`, paramValue)
    }

    getMips() {
        return this.knex
            .select('*')
            .from('CuMip')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMip(paramName, paramValue) {
        return this.knex('CuMip').where(`${paramName}`, paramValue)
    }

    getMip39s() {
        return this.knex
            .select('*')
            .from('Mip39')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMip39(paramName, paramValue) {
        return this.knex('Mip39').where(`${paramName}`, paramValue)
    }

    getMip40s() {
        return this.knex
            .select('*')
            .from('Mip40')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMip40(paramName, paramValue) {
        return this.knex('Mip40').where(`${paramName}`, paramValue)
    }

    getMip40BudgetPeriods() {
        return this.knex
            .select('*')
            .from('Mip40BudgetPeriod')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMip40BudgetPeriod(paramName, paramValue) {
        return this.knex('Mip40BudgetPeriod').where(`${paramName}`, paramValue)
    }

    getMip40Wallets() {
        return this.knex
            .select('*')
            .from('Mip40Wallet')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMip40Wallet(paramName, paramValue) {
        return this.knex('Mip40Wallet').where(`${paramName}`, paramValue)
    }

    getMip40BudgetLineItems() {
        return this.knex
            .select('*')
            .from('Mip40BudgetLineItem')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMip40BudgetLineItem(paramName, paramValue) {
        return this.knex('Mip40BudgetLineItem').where(`${paramName}`, paramValue)
    }

    getMip41s() {
        return this.knex
            .select('*')
            .from('Mip41')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMip41(paramName, paramValue) {
        return this.knex('Mip41').where(`${paramName}`, paramValue)
    }

    getSocialMediaChannels() {
        return this.knex
            .select('*')
            .from('SocialMediaChannels')
            .orderBy('id')
            .cache(MINUTE)
    }

    getSocialMediaChannel(paramName, paramValue) {
        return this.knex('SocialMediaChannels').where(`${paramName}`, paramValue)
    }

    getContributorCommitments() {
        return this.knex
            .select('*')
            .from('ContributorCommitment')
            .orderBy('id')
            .cache(MINUTE)
    }
    getContributorCommitment(paramName, paramValue) {
        return this.knex('ContributorCommitment').where(`${paramName}`, paramValue)
    }
    getCuGithubContributions() {
        return this.knex
            .select('*')
            .from('ContributorCommitment')
            .orderBy('id')
            .cache(MINUTE)
    }
    getRoadmaps() {
        return this.knex
            .select('*')
            .from('Roadmap')
            .orderBy('id')
            .cache(MINUTE)
    }
    getContributors() {
        return this.knex
            .select('*')
            .from('Contributor')
            .orderBy('id')
            .cache(MINUTE)
    }

    getContributor(paramName, paramValue) {
        return this.knex('Contributor').where(`${paramName}`, paramValue)
    }
}

export default EcosystemDatabase;