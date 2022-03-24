import { gql } from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema';
import _ from 'lodash'

import {
    typeDefs as CoreUnit,
    resolvers as CoreUnitResolvers
} from './coreUnit.js';
import {
    typeDefs as BudgetStatement,
    resolvers as BudgetStatementResolvers
} from './budgetStatement.js';
import {
    typeDefs as CuMip,
    resolvers as CuMipResolvers
} from './cuMip.js';
import {
    typeDefs as SocialMediaChannels,
    resolvers as SocialMediaChannelsResolvers
} from './socialMediaChannels.js';
import {
    typeDefs as ContributorCommitment,
    resolvers as ContributorCommitmentResolvers
} from './contributorCommitment.js'
import {
    typeDefs as CuGithubContribution,
    resolvers as CuGithubContributionResolvers
}from './cuGithubContribution.js'
import {
    typeDefs as Roadmap, 
    resolvers as RoadmapResolvers
}from './roadmap.js'

const Query = gql`
    type Query
`

const resolvers = {
    Query: {

    }
}

const schema = makeExecutableSchema({
    typeDefs: [
        Query,
        CoreUnit,
        BudgetStatement,
        CuMip,
        SocialMediaChannels,
        ContributorCommitment,
        CuGithubContribution,
        Roadmap
    ],
    resolvers: _.merge(
        resolvers,
        CoreUnitResolvers,
        BudgetStatementResolvers,
        CuMipResolvers,
        SocialMediaChannelsResolvers,
        ContributorCommitmentResolvers,
        CuGithubContributionResolvers,
        RoadmapResolvers
    )
})

export default schema;