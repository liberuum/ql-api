import { SQLDataSource } from "datasource-sql";

const MINUTE = 60;

class EcosystemDatabase extends SQLDataSource {
    getCoreUnits() {
        return this.knex
            .select('*')
            .from('Core_Unit')
            .orderBy('Code')
            .cache(MINUTE)
    };

    getCoreUnitById(code) {
        return this.knex('Core_Unit').where({ Code: code })
    }

    addCoreUnit(code, name) {
        return this.knex('Core_Unit').insert({ Code: code, Name: name })
    }
}

export default EcosystemDatabase;