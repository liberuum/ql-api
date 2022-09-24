import _ from 'lodash'
import { makeExecutableSchema } from '@graphql-tools/schema';
import moduleSettings from './default.config.js';

const moduleTypeDefs = [];
const moduleResolvers = {};

for (const moduleName of Object.keys(moduleSettings)) {
    const settings = moduleSettings[moduleName];
    if (settings.enabled) {
        const schemaJs = await import(`./${moduleName}/schema.js`);
        moduleTypeDefs.push(...schemaJs.typeDefs);
        _.merge(moduleResolvers, schemaJs.resolvers);
    }
}

import {
    typeDefs as scalarTypeDefs,
    resolvers as scalarResolvers
} from 'graphql-scalars';

import {
    typeDefs as Utils,
    resolvers as UtilsResolvers
} from './utilTypes.js';

import {
    typeDefs as ViewData,
    resolvers as ViewDataResolvers
} from './viewData.js';

const typeDefs = [
    ...scalarTypeDefs,
    ...moduleTypeDefs,
    Utils,
    ViewData,
];

const resolvers = _.merge(
    scalarResolvers,
    moduleResolvers,
    UtilsResolvers,
    ViewDataResolvers,
);

export default makeExecutableSchema({ typeDefs, resolvers });