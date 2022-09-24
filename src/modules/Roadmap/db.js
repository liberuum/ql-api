const MINUTE = 60;
export default {

    getRoadmaps(ownerCuId) {
        if (ownerCuId === undefined) {
            return this.knex
                .select('*')
                .from('Roadmap')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Roadmap').where('ownerCuId', ownerCuId)
        }
    },

    getRoadmap(paramName, paramValue) {
        return this.knex('Roadmap').where(`${paramName}`, paramValue)
    },

    getRoadmapStakeholders(roadmapId) {
        if (roadmapId === undefined) {
            return this.knex
                .select('*')
                .from('RoadmapStakeholder')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('RoadmapStakeholder').where('roadmapId', roadmapId)
        }
    },

    getRoadmapStakeholdersByStakeholderId(stakeholderId) {
        return this.knex('RoadmapStakeholder').where('stakeholderId', stakeholderId)
    },

    getRoadmapStakeholder(paramName, paramValue) {
        return this.knex('RoadmapStakeholder').where(`${paramName}`, paramValue)
    },

    getStakeholderRoles(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('StakeholderRole')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('StakeholderRole').where('id', id)
        }
    },

    getStakeholderRole(paramName, paramValue) {
        return this.knex('StakeholderRole').where(`${paramName}`, paramValue)
    },

    getStakeholders(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('Stakeholder')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Stakeholder').where('id', id)
        }
    },

    getStakeholder(paramName, paramValue) {
        return this.knex('Stakeholder').where(`${paramName}`, paramValue)
    },

    getRoadmapOutputs(roadmapId) {
        if (roadmapId === undefined) {
            return this.knex
                .select('*')
                .from('RoadmapOutput')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('RoadmapOutput').where('roadmapId', roadmapId)
        }
    },

    getRoadmapOutput(paramName, paramValue) {
        return this.knex('RoadmapOutput').where(`${paramName}`, paramValue)
    },

    getOutputs(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('Output')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Output').where('id', id)
        }
    },

    getOutput(paramName, paramValue) {
        return this.knex('Output').where(`${paramName}`, paramValue)
    },

    getOutputTypes(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('OutputType')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('OutputType').where('id', id)
        }
    },

    getOutputType(paramName, paramValue) {
        return this.knex('OutputType').where(`${paramName}`, paramValue)
    },

    getMilestones(roadmapId) {
        if (roadmapId === undefined) {
            return this.knex
                .select('*')
                .from('Milestone')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Milestone').where('roadmapId', roadmapId)
        }
    },

    getMilestone(paramName, paramValue) {
        return this.knex('Milestone').where(`${paramName}`, paramValue)
    },

    getTasks(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('Task')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Task').where('id', id)
        }
    },

    getTask(paramName, paramValue) {
        return this.knex('Task').where(`${paramName}`, paramValue)
    },

    getTaskOutputs() {
        return this.knex
            .select('*')
            .from('TaskOutput')
            .orderBy('id')
            .cache(MINUTE)
    },

    getTaskOutput(paramName, paramValue) {
        return this.knex('TaskOutput').where(`${paramName}`, paramValue)
    },

    getReviews(taskId) {
        if (taskId === undefined) {
            return this.knex
                .select('*')
                .from('Review')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Review').where('taskId', taskId)
        }
    },

    getReview(paramName, paramValue) {
        return this.knex('Review').where(`${paramName}`, paramValue)
    },
};