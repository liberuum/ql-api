const MINUTE = 60;

export default {

    getCoreUnits(limit, offset) {
        if (limit !== undefined && offset !== undefined) {
            return this.knex
                .select('')
                .from('CoreUnit')
                .limit(limit)
                .offset(offset)
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex
                .select('*')
                .from('CoreUnit')
                .orderBy('id')
                .cache(MINUTE)
        }
    },

    getCoreUnit(paramName, paramValue) {
        return this.knex('CoreUnit').where(`${paramName}`, paramValue)
    },

    getCuUpdates(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('CuUpdate')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('CuUpdate').where('cuId', cuId)
        }
    },

    getCuUpdate(paramName, paramValue) {
        return this.knex('CuUpdate').where(`${paramName}`, paramValue)
    },

    getSocialMediaChannels(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('SocialMediaChannels')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('SocialMediaChannels').where('cuId', cuId)
        }
    },

    getSocialMediaChannel(paramName, paramValue) {
        return this.knex('SocialMediaChannels').where(`${paramName}`, paramValue)
    },

    getContributorCommitments(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('ContributorCommitment')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('ContributorCommitment').where('cuId', cuId)
        }
    },

    getContributorCommitment(paramName, paramValue) {
        return this.knex('ContributorCommitment').where(`${paramName}`, paramValue)
    },

    getCuGithubContributions(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('CuGithubContribution')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('CuGithubContribution').where('cuId', cuId)
        }
    },

    getCuGithubContribution(paramName, paramValue) {
        return this.knex('CuGithubContribution').where(`${paramName}`, paramValue)
    },

    getContributors(limit, offset) {
        if (limit !== undefined && offset !== undefined) {
            return this.knex
                .select()
                .from('Contributor')
                .limit(limit)
                .offset(offset)
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex
                .select('*')
                .from('Contributor')
                .orderBy('id')
                .cache(MINUTE)
        }
    },

    getContributor(paramName, paramValue) {
        return this.knex('Contributor').where(`${paramName}`, paramValue)
    },

    getContributorById(id) {
        return this.knex('Contributor').where('id', id)
    },

    getGithubOrgs(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('GithubOrg')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('GithubOrg').where('id', id)
        }
    },

    getGithubOrg(paramName, paramValue) {
        return this.knex('GithubOrg').where(`${paramName}`, paramValue)
    },

    getGithubRepos(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('GithubRepo')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('GithubRepo').where('id', id)
        }
    },

    getGithubRepo(paramName, paramValue) {
        return this.knex('GithubRepo').where(`${paramName}`, paramValue)
    },

    getMakerGithubEcosystemAll() {
        return this.knex
            .select('*')
            .from('MakerGithubEcosystem')
            .orderBy('id')
            .cache(MINUTE)
    },

    getMakerGithubEcosystem(paramName, paramValue) {
        return this.knex('MakerGithubEcosystem').where(`${paramName}`, paramValue)
    },
};