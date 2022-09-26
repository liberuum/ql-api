import { SQLDataSource } from "datasource-sql";
import { Knex } from "knex";

type DatabaseFactoryFn = {
    (knex: Knex, dependencies: {[key: string]: object}): object;
}

export default class EcosystemDatabase extends SQLDataSource {
    [k: string]: any;
    private modulesIndex: {[key: string]: object} = {};

    // Load the database object of an API module
    loadModule(moduleName:string, apiModule: DatabaseFactoryFn, dependencies:string[]): void {

        if (typeof apiModule === 'function') {
            // New form where knex is injected into the apiModule factory function, together with the dependencies.
            console.log(`Loading database object for API module '${moduleName}' with dependencies [` + dependencies.join(', ') + ']');

            // Compile an object containing all the dependencies.
            const collectedDependencies = dependencies.reduce(
                (result, d) => {
                    if (!this[d]) {
                        throw Error(`Dependency ${d} not found.`);
                    }

                    result[d] = this[d];
                    return result;
                }, 
                {} as {
                    [k: string]: object;
                }
            );

            // Call the factory function
            this[moduleName] = apiModule(this.knex, collectedDependencies);

        } else {
            // Legacy form where knex is available to the apiModule object through this.knex
            console.log(`Setting '${moduleName}' db module (legacy format)`);
            Object.setPrototypeOf(apiModule, this);
            this[moduleName] = apiModule;
        }

        // Register the module in the modules object.
        this.modulesIndex[moduleName] = this[moduleName];
    }

    // Type-friendly way of retrieving a module.
    module<T>(moduleName: string): T {
        if (!this.modulesIndex.hasOwnProperty(moduleName)) {
            throw Error(`Database module ${moduleName} cannot be found.`);
        }

        return this.modulesIndex[moduleName] as T;
    }
}