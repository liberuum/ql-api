import { Knex } from "knex";

export interface Roadmap {
    id: string
    ownerCuId: string
    roadmapCode: string
    roadmapName: string
    comments: string
    roadmapStatus: object
    strategicInitiative: boolean
    roadmapSummary: string
    roadmapStakeholder: object
    roadmapOutput: object
    milestone: object
};

export interface RoadmapStakeholder {
    id: string
    stakeholderId: string
    roadmapId: string
    stakeholderRoleId: string
    stakeholderRole: object
    stakeholder: object
};

export interface StakeholderRole {
    id: string
    stakeholderRoleName: string
}

export interface Stakeholder {
    id: string
    name: string
    stakeholderContributorId: string
    stakeholderCuCode: string
    roadmapStakeholder: object
}

export interface RoadmapOutput {
    id: string
    outputId: string
    roadmapId: string
    outputTypeId: string
    output: object
    outputType: object
}

export interface Output {
    id: string
    name: string
    outputUrl: string
    outputDate: string
}

export interface OutputType {
    id: string
    outputType: string
}

export interface Milestone {
    id: string
    roadmapId: string
    taskId: string
    task: object
}

export interface Task {
    id: string
    parentId: string
    taskName: string
    taskStatus: string
    ownerStakeholderId: string
    startDate: string
    target: string
    completedPercentage: number
    confidenceLevel: string
    comments: string
    review: object
}

export interface Review {
    id: string
    taskId: string
    reviewDate: string
    reviewOutcome: string
}

export class RoadmapModel {
    knex: Knex;
    coreUnitModel: object

    constructor(knex: Knex, coreUnitModel: object) {
        this.knex = knex;
        this.coreUnitModel = coreUnitModel;
    };

    async getRoadmaps(ownerCuId: number | undefined): Promise<Roadmap[]> {
        if (ownerCuId === undefined) {
            return await this.knex
                .select('*')
                .from('Roadmap')
                .orderBy('id');
        } else {
            return await this.knex('Roadmap').where('ownerCuId', ownerCuId);
        }
    };

    async getRoadmap(paramName: string, paramValue: string | boolean): Promise<Roadmap[]> {
        return await this.knex('Roadmap').where(`${paramName}`, paramValue)
    };

    async getRoadmapStakeholders(roadmapId: string | undefined): Promise<RoadmapStakeholder[]> {
        if (roadmapId === undefined) {
            return await this.knex
                .select('*')
                .from('RoadmapStakeholder')
                .orderBy('id');
        } else {
            return await this.knex('RoadmapStakeholder').where('roadmapId', roadmapId)
        }
    };

    async getRoadmapStakeholder(paramName: string, paramValue: string): Promise<RoadmapStakeholder[]> {
        return await this.knex('RoadmapStakeholder').where(`${paramName}`, paramValue)
    };

    async getStakeholderRoles(id: string | undefined): Promise<StakeholderRole[]> {
        if (id === undefined) {
            return await this.knex
                .select('*')
                .from('StakeholderRole')
                .orderBy('id');
        } else {
            return await this.knex('StakeholderRole').where('id', id)
        }
    };

    async getStakeholderRole(paramName: string, paramValue: string): Promise<StakeholderRole[]> {
        return await this.knex('StakeholderRole').where(`${paramName}`, paramValue)
    };

    async getStakeholders(id: string | undefined): Promise<Stakeholder[]> {
        if (id === undefined) {
            return await this.knex
                .select('*')
                .from('Stakeholder')
                .orderBy('id');
        } else {
            return await this.knex('Stakeholder').where('id', id)
        }
    };

    async getStakeholder(paramName: string, paramValue: string): Promise<Stakeholder[]> {
        return await this.knex('Stakeholder').where(`${paramName}`, paramValue)
    };

    async getRoadmapOutputs(roadmapId: string | undefined): Promise<RoadmapOutput[]> {
        if (roadmapId === undefined) {
            return this.knex
                .select('*')
                .from('RoadmapOutput')
                .orderBy('id');
        } else {
            return this.knex('RoadmapOutput').where('roadmapId', roadmapId)
        }
    };

    async getRoadmapOutput(paramName: string, paramValue: string): Promise<RoadmapOutput[]> {
        return await this.knex('RoadmapOutput').where(`${paramName}`, paramValue)
    };

    async getOutputs(id: string | undefined): Promise<Output[]> {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('Output')
                .orderBy('id');
        } else {
            return this.knex('Output').where('id', id)
        }
    };

    async getOutput(paramName: string, paramValue: string): Promise<Output[]> {
        return await this.knex('Output').where(`${paramName}`, paramValue);
    };

    async getOutputTypes(id: string | undefined): Promise<OutputType[]> {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('OutputType')
                .orderBy('id');
        } else {
            return this.knex('OutputType').where('id', id)
        }
    };

    async getOutputType(paramName: string, paramValue: string): Promise<OutputType[]> {
        return this.knex('OutputType').where(`${paramName}`, paramValue)
    };

    async getMilestones(roadmapId: string | undefined): Promise<Milestone[]> {
        if (roadmapId === undefined) {
            return this.knex
                .select('*')
                .from('Milestone')
                .orderBy('id');
        } else {
            return this.knex('Milestone').where('roadmapId', roadmapId)
        }
    };

    async getMilestone(paramName: string, paramValue: string): Promise<Milestone[]> {
        return this.knex('Milestone').where(`${paramName}`, paramValue)
    };

    async getTasks(id: string | undefined): Promise<Task[]> {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('Task')
                .orderBy('id');
        } else {
            return this.knex('Task').where('id', id)
        }
    };

    async getTask(paramName: string, paramValue: string | number): Promise<Task[]> {
        return this.knex('Task').where(`${paramName}`, paramValue)
    };

    async getReviews(taskId: string | undefined): Promise<Review[]> {
        if (taskId === undefined) {
            return this.knex
                .select('*')
                .from('Review')
                .orderBy('id');
        } else {
            return this.knex('Review').where('taskId', taskId)
        }
    };

    async getReview(paramName: string, paramValue: string): Promise<Review[]> {
        return this.knex('Review').where(`${paramName}`, paramValue)
    };
}

export default (knex: Knex, deps: { [key: string]: object }) => new RoadmapModel(knex, deps['CoreUnit']);