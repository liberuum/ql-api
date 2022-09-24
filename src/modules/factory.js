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
    const moduleTypeDefs = [];
    const moduleResolvers = {};

    for (const moduleName of enabledModules) {
        const settings = moduleSettings[moduleName];

        // Check that all dependencies of the module are included.
        const dependencies = settings.require || [];
        for (const d of dependencies) {
            if (!enabledModules.includes(d)) {
                throw Error(`API module '${d}' is a dependency of '${moduleName}', but it ${moduleSettings[d] ? 'is not enabled' : 'cannot be found'}.`);
            }
        }

        // Import the type definitions and resolvers of the module
        console.log(`Importing API module '${moduleName}'...`)
        const schemaJs = await import(`./${moduleName}/schema.js`);
        moduleTypeDefs.push(...schemaJs.typeDefs);
        _.merge(moduleResolvers, schemaJs.resolvers);

        // Import the API module's datasource
        const moduleDataSource = await import(`./${moduleName}/db.js`);
        datasource.extend(moduleDataSource.default, moduleName);
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

//
export default linkApiModules;