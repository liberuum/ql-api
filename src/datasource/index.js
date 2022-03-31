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

    getMip40s() {
        return this.knex
            .select('*')
            .from('Mip40')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMip41s() {
        return this.knex
            .select('*')
            .from('Mip41')
            .orderBy('id')
            .cache(MINUTE)
    }

    getSocialMediaChannels() {
        return this.knex
            .select('*')
            .from('SocialMediaChannels')
            .orderBy('id')
            .cache(MINUTE)
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
}

export default EcosystemDatabase;