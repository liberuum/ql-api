import { gql } from "apollo-server-core";

export const typeDefs = [gql`

    "Core Unit or Cross Core Unit Intitiatives"
    type Roadmap {
        "Auto generated id field"
        id: ID!
        "Roadmap owner. Null value is for Cross Core Unit Initiative"
        ownerCuId: ID
        "An alphanumeric code representing the roadmap. Ex: SES-Q2-O3 SES Quarter 2 Objective 3"
        roadmapCode: String
        "Identifying name of a roadmap"
        roadmapName: String
        comments: String
        "Todo, InProgress or Done"
        roadmapStatus: RoadmapStatus
        strategicInitiative: Boolean
        roadmapSummary: String
        "Involved stakehodlders in the roadmap"
        roadmapStakeholder: [RoadmapStakeholder]
        "Links to documents showcasing the results of the roadmap"
        roadmapOutput: [RoadmapOutput]
        milestone: [Milestone]
    }



    enum RoadmapStatus {
        Todo
        InProgress
        Done
    }


    "Roadmap stakeholders can be independent contributors or core unit contributors"
    type RoadmapStakeholder {
        id: ID!
        stakeholderId: ID!
        roadmapId: ID!
        stakeholderRoleId: ID!
        stakeholderRole: [StakeholderRole]
        stakeholder: [Stakeholder]
    }

    "Individual stakehodlers that can be under a core unit, or independent."
    type Stakeholder {
        id: ID!
        name: String
        stakeholderContributorId: ID
        stakeholderCuCode: String
        roadmapStakeholder: [RoadmapStakeholder]
    }

    type StakeholderRole {
        id: ID!
        stakeholderRoleName: String!
    }

    type RoadmapOutput {
        id: ID!
        outputId: ID
        roadmapId: ID
        outputTypeId: ID
        output: [Output]
        outputType: [OutputType]
    }

    "Links to documents showcasing the output of a given roadmap"
    type Output {
        id: ID!
        name: String
        outputUrl: String
        outputDate: String
    }

    type OutputType {
        id: ID!
        outputType: String
    }


    "Parent task under a certain roadmap that can have many sub tasks"
    type Milestone {
        id: ID!
        roadmapId: ID!
        taskId: ID!
        task: [Task]
    }

    "Task under a milestone. It can also be a subtask if parentId is not null"
    type Task {
        id: ID!
        "ParentId represents the taskId of the parent task. If parentId is present, the current task is a sub task of another task with same Id as parentID "
        parentId: ID
        taskName: String
        taskStatus: TaskStatus
        ownerStakeholderId: ID
        startDate: String
        target: String
        completedPercentage: Float
        confidenceLevel: ConfidenceLevel
        comments: String
        review: [Review]
    }

    enum TaskStatus {
        ToDo
        InProgress
        Done
        WontDo
        Blocked
        Backlog
    }
    
    enum ConfidenceLevel {
        High
        Medium
        Low
    }

    "Review of a certain task"
    type Review {
        id: ID!
        taskId: ID!
        reviewDate: String!
        "Red,yellow or green."
        reviewOutcome: ReviewOutcome!
    }

    enum ReviewOutcome {
        Red
        Yellow
        Green
    }

    input RoadmapFilter {
        id: ID
        ownerCuId: ID
        roadmapCode: String
        roadmapName: String
        comments: String
        roadmapStatus: RoadmapStatus
        strategicInitiative: Boolean
    }

    input RoadmapOutputFilter {
        id: ID
        outputId: ID
        roadmapId: ID
        outputTypeId: ID
    }

    input StakeholderFilter {
        id: ID
        name: String
        stakeholderContributorId: ID
        stakeholderCuCode: String
    }

    input RoadmapStakeholderFilter {
        id: ID
        stakeholderId: ID
        roadmapId: ID
        stakeholderRoleId: ID
    }

    input StakeholderRoleFilter {
        id: ID
        stakeholderRoleName: String
    }

    input OutputFilter {
        id: ID
        name: String
        outputDate: String
        outputUrl: String
    }

    input OutputTypeFilter {
        id: ID
        outputType: String
    }

    input MilestoneFilter {
        id: ID
        roadmapId: ID
        taskId: ID
    }

    input TaskFilter {
        id: ID
        parentId: ID
        taskName: String
        taskStatus: TaskStatus
        ownerStakeholderId: ID
        startDate: String
        target: String
        completedPercentage: Float
        confidenceLevel: ConfidenceLevel
    }

    input ReviewFilter {
        id: ID
        taskId: ID
        reviewDate: String
        reviewOutcome: ReviewOutcome
    }

    extend type Query {
        roadmaps: [Roadmap]
        roadmap(filter: RoadmapFilter): [Roadmap]
        roadmapStakeholders: [RoadmapStakeholder]
        roadmapStakeholder(filter: RoadmapStakeholderFilter): [RoadmapStakeholder]
        stakeholders: [Stakeholder]
        stakeholder(filter: StakeholderFilter): [Stakeholder]
        stakeholderRoles: [StakeholderRole]
        stakeholderRole(filter: StakeholderRoleFilter): [StakeholderRole]
        outputs: [Output]
        output(filter: OutputFilter): [Output]
        outputTypes: [OutputType]
        outputType(filter: OutputTypeFilter): [OutputType]
        milestones: [Milestone]
        milestone(filter: MilestoneFilter): [Milestone]
        tasks: [Task],
        task(filter: TaskFilter): [Task]
        reviews: [Review]
        review(filter: ReviewFilter): [Review]
        roadmapOutputs: [RoadmapOutput]
        roadmapOutput(filter: RoadmapOutputFilter): [RoadmapOutput]
    }

    extend type CoreUnit {
        "Access details on the roadmap (work performed and planned) of a Core Unit"
        roadMap: [Roadmap]
    }
`];

export const resolvers = {
    Query: {
        roadmaps: async (_, __, { dataSources }) => {
            return await dataSources.db.Roadmap.getRoadmaps()
        },
        roadmap: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getRoadmap(paramName, paramValue);
        },
        roadmapStakeholders: async (_, __, { dataSources }) => {
            return await dataSources.db.Roadmap.getRoadmapStakeholders()
        },
        roadmapStakeholder: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getRoadmapStakeholder(paramName, paramValue);
        },
        stakeholders: async (_, __, { dataSources }) => {
            return await dataSources.db.Roadmap.getStakeholders()
        },
        stakeholder: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getStakeholder(paramName, paramValue);
        },
        stakeholderRoles: async (_, __, { dataSources }) => {
            return dataSources.db.Roadmap.getStakeholderRoles()
        },
        stakeholderRole: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getStakeholderRole(paramName, paramValue);
        },
        roadmapOutputs: async (_, __, { dataSources }) => {
            return await dataSources.db.Roadmap.getRoadmapOutputs();
        },
        roadmapOutput: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getRoadmapOutput(paramName, paramValue);
        },
        outputs: async (_, __, { dataSources }) => {
            return await dataSources.db.Roadmap.getOutputs()
        },
        output: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getOutput(paramName, paramValue);
        },
        outputTypes: async (_, __, { dataSources }) => {
            return await dataSources.db.Roadmap.getOutputTypes();
        },
        outputType: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getOutputType(paramName, paramValue);
        },
        milestones: async (_, __, { dataSources }) => {
            return dataSources.db.Roadmap.getMilestones()
        },
        milestone: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getMilestone(paramName, paramValue);
        },
        tasks: async (_, __, { dataSources }) => {
            return await dataSources.db.Roadmap.getTasks();
        },
        task: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getTask(paramName, paramValue);
        },
        reviews: async (_, __, { dataSources }) => {
            return dataSources.db.Roadmap.getReviews()
        },
        review: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.Roadmap.getReview(paramName, paramValue);
        }


    },
    Roadmap: {
        roadmapStakeholder: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.Roadmap.getRoadmapStakeholders(id)
            return result
        },
        roadmapOutput: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.Roadmap.getRoadmapOutputs(id)
            return result
        },
        milestone: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.Roadmap.getMilestones(id);
            return result;
        }
    },
    RoadmapStakeholder: {
        stakeholderRole: async (parent, __, { dataSources }) => {
            const { stakeholderRoleId } = parent;
            const result = await dataSources.db.Roadmap.getStakeholderRoles(stakeholderRoleId);
            return result
        },
        stakeholder: async (parent, __, { dataSources }) => {
            const { stakeholderId } = parent;
            const result = await dataSources.db.Roadmap.getStakeholders(stakeholderId);
            return result;
        }
    },
    Stakeholder: {
        roadmapStakeholder: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.Roadmap.getRoadmapStakeholder('stakeholderId', id)
            return result
        }
    },
    RoadmapOutput: {
        output: async (parent, __, { dataSources }) => {
            const { outputId } = parent;
            const result = await dataSources.db.Roadmap.getOutputs(outputId);
            return result;
        },
        outputType: async (parent, __, { dataSources }) => {
            const { outputTypeId } = parent;
            const result = await dataSources.db.Roadmap.getOutputTypes(outputTypeId);
            return result;
        }
    },
    Milestone: {
        task: async (parent, __, { dataSources }) => {
            const { taskId } = parent;
            const result = await dataSources.db.Roadmap.getTasks(taskId)
            return result;
        }
    },
    Task: {
        review: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.Roadmap.getReviews(id);
            return result
        }
    },
    CoreUnit: {
        roadMap: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.Roadmap.getRoadmaps(id);
            return result;
        },
    }
}