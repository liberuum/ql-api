const MINUTE = 60;

export default {
    getBudgetToolVersions() {
        return this.knex('BudgetToolVersion').orderBy('id', 'desc').cache(MINUTE);
    },

    getLatestBudgetToolVersion() {
        return this.knex('BudgetToolVersion').orderBy('id', 'desc').limit(1);
    },
};