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

    getCoreUnitByCode(code) {
        return this.knex('CoreUnit').where({ code: code })
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
    getMips() {
        return this.knex
            .select('*')
            .from('CuMip')
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
}

export default EcosystemDatabase;