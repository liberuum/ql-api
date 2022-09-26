import { SQLDataSource } from "datasource-sql";

export default class EcosystemDatabase extends SQLDataSource {

    // Load the database object of an API module
    loadModule(moduleName, apiModule, dependencies) {

        if (typeof apiModule === 'function') {
            // New form where knex is injected into the apiModule factory function, together with the dependencies.
            console.log(`Loading database object for API module '${moduleName}' with dependencies [` + dependencies.join(', ') + ']');

            // Compile an object containing all the dependencies.
            const collectedDependencies = dependencies.reduce((result, d) => {
                if (!this[d]) {
                    throw Error(`Dependency ${d} not found.`);
                }

                result[d] = this[d];
                return result;
            }, {});

            // Call the factory function
            this[moduleName] = apiModule(this.knex, collectedDependencies);

        } else {
            // Legacy form where knex is available to the apiModule object through this.knex
            console.log(`Setting '${moduleName}' db module (legacy format)`);
            Object.setPrototypeOf(apiModule, this);
            this[moduleName] = apiModule;
        }
    }
}