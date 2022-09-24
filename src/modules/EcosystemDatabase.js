import { SQLDataSource } from "datasource-sql";

const MINUTE = 60;

class EcosystemDatabase extends SQLDataSource {
    // Extend the database object with a new API module
    extend(apiModule, name) {
        Object.setPrototypeOf(apiModule, this);
        this[name] = apiModule;
    }
}

export default EcosystemDatabase;