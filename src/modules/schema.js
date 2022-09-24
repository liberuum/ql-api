import _ from 'lodash'
import { makeExecutableSchema } from '@graphql-tools/schema';

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

// Modules
import {
    typeDefs as Users,
    resolvers as UsersResolvers
} from './Auth/schema.js';

import {
    typeDefs as BudgetStatement,
    resolvers as BudgetStatementResolvers
} from './BudgetStatement/schema.js';

import {
    typeDefs as BudgetToolVersion,
    resolvers as BudgetToolVersionResolvers
} from './ClientVersion/schema.js'

import {
    typeDefs as CoreUnit,
    resolvers as CoreUnitResolvers
} from './CoreUnit/schema.js';

import {
    typeDefs as CuMip,
    resolvers as CuMipResolvers
} from './Mip/schema.js';

import {
    typeDefs as Roadmap,
    resolvers as RoadmapResolvers
} from './Roadmap/schema.js';


const typeDefs = [
    ...scalarTypeDefs,
    Utils,
    ViewData,
    ...BudgetStatement,
    ...BudgetToolVersion,
    ...CoreUnit,
    ...CuMip,
    ...Roadmap,
    ...Users,
];

const resolvers = _.merge(
    scalarResolvers,
    CoreUnitResolvers,
    BudgetStatementResolvers,
    CuMipResolvers,
    RoadmapResolvers,
    UtilsResolvers,
    UsersResolvers,
    ViewDataResolvers,
    BudgetToolVersionResolvers
);

export default makeExecutableSchema({ typeDefs, resolvers });