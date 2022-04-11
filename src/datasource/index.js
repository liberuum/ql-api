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
            .from('CuGithubContribution')
            .orderBy('id')
            .cache(MINUTE)
    }

    getCuGithubContribution(paramName, paramValue) {
        return this.knex('CuGithubContribution').where(`${paramName}`, paramValue)
    }

    getRoadmaps() {
        return this.knex
            .select('*')
            .from('Roadmap')
            .orderBy('id')
            .cache(MINUTE)
    }

    getRoadmap(paramName, paramValue) {
        return this.knex('Roadmap').where(`${paramName}`, paramValue)
    }

    getRoadmapStakeholders() {
        return this.knex
            .select('*')
            .from('RoadmapStakeholder')
            .orderBy('id')
            .cache(MINUTE)
    }

    getRoadmapStakeholder(paramName, paramValue) {
        return this.knex('RoadmapStakeholder').where(`${paramName}`, paramValue)
    }

    getStakeholderRoles() {
        return this.knex
            .select('*')
            .from('StakeholderRole')
            .orderBy('id')
            .cache(MINUTE)
    }

    getStakeholderRole(paramName, paramValue) {
        return this.knex('StakeholderRole').where(`${paramName}`, paramValue)
    }

    getStakeholders() {
        return this.knex
            .select('*')
            .from('Stakeholder')
            .orderBy('id')
            .cache(MINUTE)
    }

    getStakeholder(paramName, paramValue) {
        return this.knex('Stakeholder').where(`${paramName}`, paramValue)
    }

    getRoadmapOutputs() {
        return this.knex
            .select('*')
            .from('RoadmapOutput')
            .orderBy('id')
            .cache(MINUTE)
    }

    getRoadmapOutput(paramName, paramValue) {
        return this.knex('RoadmapOutput').where(`${paramName}`, paramValue)
    }

    getOutputs() {
        return this.knex
            .select('*')
            .from('Output')
            .orderBy('id')
            .cache(MINUTE)
    }

    getOutput(paramName, paramValue) {
        return this.knex('Output').where(`${paramName}`, paramValue)
    }

    getOutputTypes() {
        return this.knex
            .select('*')
            .from('OutputType')
            .orderBy('id')
            .cache(MINUTE)
    }

    getOutputType(paramName, paramValue) {
        return this.knex('OutputType').where(`${paramName}`, paramValue)
    }

    getMilestones() {
        return this.knex
            .select('*')
            .from('Milestone')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMilestone(paramName, paramValue) {
        return this.knex('Milestone').where(`${paramName}`, paramValue)
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

    getGithubOrgs() {
        return this.knex
            .select('*')
            .from('GithubOrg')
            .orderBy('id')
            .cache(MINUTE)
    }

    getGithubOrg(paramName, paramValue) {
        return this.knex('GithubOrg').where(`${paramName}`, paramValue)
    }

    getGithubRepos() {
        return this.knex
            .select('*')
            .from('GithubRepo')
            .orderBy('id')
            .cache(MINUTE)
    }

    getGithubRepo(paramName, paramValue) {
        return this.knex('GithubRepo').where(`${paramName}`, paramValue)
    }

    getMakerGithubEcosystemAll() {
        return this.knex
            .select('*')
            .from('MakerGithubEcosystem')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMakerGithubEcosystem(paramName, paramValue) {
        return this.knex('MakerGithubEcosystem').where(`${paramName}`, paramValue)
    }

    getTasks() {
        return this.knex
            .select('*')
            .from('Task')
            .orderBy('id')
            .cache(MINUTE)
    }

    getTask(paramName, paramValue) {
        return this.knex('Task').where(`${paramName}`, paramValue)
    }

    getTaskOutputs() {
        return this.knex
            .select('*')
            .from('TaskOutput')
            .orderBy('id')
            .cache(MINUTE)
    }

    getTaskOutput(paramName, paramValue) {
        return this.knex('TaskOutput').where(`${paramName}`, paramValue)
    }

    getReviews() {
        return this.knex
            .select('*')
            .from('Review')
            .orderBy('id')
            .cache(MINUTE)
    }

    getReview(paramName, paramValue) {
        return this.knex('Review').where(`${paramName}`, paramValue)
    }
}

export default EcosystemDatabase;