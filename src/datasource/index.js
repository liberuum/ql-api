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

    getCoreUnitById(code) {
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
}

export default EcosystemDatabase;