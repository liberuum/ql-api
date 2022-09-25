import _ from 'lodash'
import moduleSettings from './default.config.js';

// Import scalar type definitions and resolvers
import {
    typeDefs as scalarTypeDefs,
    resolvers as scalarResolvers
} from 'graphql-scalars';

// Import Query and Error base type definitions and resolvers
import {
    typeDefs as BaseTypes,
    resolvers as BaseTypeResolvers
} from './base.schema.js';

// 
async function linkApiModules(datasource) {

    // Import the API module types and resolvers that are enabled in the settings
    const enabledModules = Object.keys(moduleSettings).filter(m => moduleSettings[m].enabled);
    const moduleTypeDefs = [], moduleResolvers = {};

    for (const moduleName of sortDependencyTree(enabledModules, moduleSettings)) {
        // Import the type definitions and resolvers of the module
        console.log(`Importing API module '${moduleName}'...`)
        const schemaJs = await import(`./${moduleName}/schema.js`);
        moduleTypeDefs.push(...schemaJs.typeDefs);
        _.merge(moduleResolvers, schemaJs.resolvers);

        // Import the API module's datasource
        const moduleDataSource = await import(`./${moduleName}/db.js`);
        const dependencies = moduleSettings[moduleName].require || [];

        datasource.extend(moduleName, moduleDataSource.default, dependencies);
    }

    // Compile final type definitions list
    const typeDefs = [
        ...scalarTypeDefs,
        BaseTypes,
        ...moduleTypeDefs,
    ];

    // Compile final resolvers object
    const resolvers = _.merge(
        scalarResolvers,
        BaseTypeResolvers,
        moduleResolvers,
    );

    return { typeDefs, resolvers, datasource };
}

// Sort the list of modules so we're guaranteed to load all dependencies before we're loading the dependent module.
function sortDependencyTree(modules, settings) {

    // Modules will be added to result in the order they get resolved.
    const result = [];

    // Build an index that keeps track of whether the module has been resolved, and its depenedencies.
    const index = modules.reduce((index, module) => {
        // Normalized array of dependencies.
        const deps = settings[module].require || [];
        
        if (deps.length < 1) {
            // If the module has no dependencies, resolve it right away.
            result.push(module);
            index[module] = {resolved: true, deps};
        } else {
            // If the modules has at least one dependency, we'll resolve it later.
            index[module] = {resolved: false, deps};
        }

        return index;
    }, {});

    // Keep going until all modules have been resolved
    while (result.length < modules.length) {
        let resolvedNoNewModules = true;

        // Take all the modules that (1) have not been resolved, but (2) have all their dependencies already resolved
        modules.filter(m => !index[m].resolved && index[m].deps.every(d => index[d].resolved))

        // Resolve the selected modules
        .forEach(m => {
            resolvedNoNewModules = false;
            result.push(m);
            index[m].resolved = true;
        });

        // If no additional module was resolved this iteration, we're stuck with a missing or circular dependency 
        if (resolvedNoNewModules) {
            throw Error("Missing or circular dependencies exist for API modules in [" + modules.filter(m => !index[m].resolved).join(", ") + "]");
        }
    }

    return result;
}

//
export default linkApiModules;