import { gql } from "apollo-server-core";

export const typeDefs = gql`

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
        "Involved stakehodlders in the roadmap"
        roadmapStakeholder: [RoadmapStakeholder]
        "Links to documents showcasing the results of the roadmap"
        output: [Output]
        "Major tasks under the current roadmap"
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
        outputId: ID!
        roadmapId: ID!
        outputTypeId: ID!
        output: [Output]
        outputType: [OutputType]
    }

    "Links to documents showcasing the output of a given roadmap"
    type Output {
        id: ID!
        name: String
        roadmapId: ID
        outputUrl: String
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
        "Links to documents showing results of the tasks"
        taskOutput: [TaskOutput]
        review: [Review]
    }

    enum TaskStatus {
        ToDo
        InProgress
        Done
        WontDo
        Blocked
    }
    
    enum ConfidenceLevel {
        High
        Medium
        Low
    }

    type TaskOutput {
        id: ID!
        taskId: ID!
        outputUrl: String
        outputName: String
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
        roadmapId: ID
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

    input TaskOutputFilter {
        id: ID
        taskId: ID
        outputUrl: String
        outputName: String
    }

    input ReviewFilter {
        id: ID
        taskId: ID
        reviewDate: String
        reviewOutcome: ReviewOutcome
    }

    type Query {
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
        taskOutputs: [TaskOutput]
        taskOutput(filter: TaskOutputFilter): [TaskOutput]
        reviews: [Review]
        review(filter: ReviewFilter): [Review]
        roadmapOutputs: [RoadmapOutput]
        roadmapOutput(filter: RoadmapOutputFilter): [RoadmapOutput]
    }

`;

export const resolvers = {
    Query: {
        roadmaps: async (_, __, { dataSources }) => {
            return await dataSources.db.getRoadmaps()
        },
        roadmap: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getRoadmap(paramName, paramValue);
        },
        roadmapStakeholders: async (_, __, { dataSources }) => {
            return await dataSources.db.getRoadmapStakeholders()
        },
        roadmapStakeholder: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getRoadmapStakeholder(paramName, paramValue);
        },
        stakeholders: async (_, __, { dataSources }) => {
            return await dataSources.db.getStakeholders()
        },
        stakeholder: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getStakeholder(paramName, paramValue);
        },
        stakeholderRoles: async (_, __, { dataSources }) => {
            return dataSources.db.getStakeholderRoles()
        },
        stakeholderRole: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getStakeholderRole(paramName, paramValue);
        },
        roadmapOutputs: async (_, __, { dataSources }) => {
            return await dataSources.db.getRoadmapOutputs();
        },
        roadmapOutput: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getRoadmapOutput(paramName, paramValue);
        },
        outputs: async (_, __, { dataSources }) => {
            return await dataSources.db.getOutputs()
        },
        output: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getOutput(paramName, paramValue);
        },
        outputTypes: async (_, __, { dataSources }) => {
            return await dataSources.db.getOutputTypes();
        },
        outputType: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getOutputType(paramName, paramValue);
        },
        milestones: async (_, __, { dataSources }) => {
            return dataSources.db.getMilestones()
        },
        milestone: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getMilestone(paramName, paramValue);
        },
        tasks: async (_, __, { dataSources }) => {
            return await dataSources.db.getTasks();
        },
        task: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getTask(paramName, paramValue);
        },
        taskOutputs: async (_, __, { dataSources }) => {
            return dataSources.db.getTaskOutputs()
        },
        taskOutput: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getTaskOutput(paramName, paramValue);
        },
        reviews: async (_, __, { dataSources }) => {
            return dataSources.db.getReviews()
        },
        review: async (_, { filter }, { dataSources }) => {
            const queryParams = Object.keys(filter);
            if (queryParams.length > 1) {
                throw "Choose one parameter only"
            }
            const paramName = queryParams[0];
            const paramValue = filter[queryParams[0]];
            return await dataSources.db.getReview(paramName, paramValue);
        }


    },
    Roadmap: {
        roadmapStakeholder: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getRoadmapStakeholders()
            const roadmapStakeholders = result.filter(roadmapStakeholder => {
                return roadmapStakeholder.roadmapId === id
            })
            return roadmapStakeholders
        },
        output: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getOutputs();
            const outputs = result.filter(output => {
                return output.roadmapId === id;
            })
            return outputs
        },
        milestone: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getMilestones();
            const milestones = result.filter(milestone => {
                return milestone.roadmapId === id;
            })
            return milestones;
        }
    },
    RoadmapStakeholder: {
        stakeholderRole: async (parent, __, { dataSources }) => {
            const { stakeholderRoleId } = parent;
            const result = await dataSources.db.getStakeholderRoles();
            const stakeholderRoles = result.filter(stakeholderRole => {
                return stakeholderRole.id === stakeholderRoleId
            })
            return stakeholderRoles
        },
        stakeholder: async (parent, __, { dataSources }) => {
            const { stakeholderId } = parent;
            const result = await dataSources.db.getStakeholders();
            const stakeholders = result.filter(stakeholder => {
                return stakeholder.id === stakeholderId;
            })
            return stakeholders;
        }
    },
    Stakeholder: {
        roadmapStakeholder: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getRoadmapStakeholders()
            const roadmapStakeholders = result.filter(roadmapStakeholder => {
                return roadmapStakeholder.stakeholderId === id;
            });
            return roadmapStakeholders
        }
    },
    RoadmapOutput: {
        output: async (parent, __, { dataSources }) => {
            const { outputId } = parent;
            const result = await dataSources.db.getOutputs();
            const outputs = result.filter(output => {
                return output.id === outputId
            })
            return outputs;
        },
        outputType: async (parent, __, { dataSources }) => {
            const { outputTypeId } = parent;
            const result = await dataSources.db.getOutputTypes();
            const outputTypes = result.filter(outputType => {
                return outputType.id === outputTypeId
            })
            return outputTypes;
        }
    },
    Milestone: {
        task: async (parent, __, { dataSources }) => {
            const { taskId } = parent;
            const result = await dataSources.db.getTasks()
            const tasks = result.filter(task => {
                return task.id === taskId;
            })
            return tasks;
        }
    },
    Task: {
        taskOutput: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getTaskOutputs();
            const taskOutputs = result.filter(taskOutput => {
                return taskOutput.taskId === id;
            })
            return taskOutputs;
        },
        review: async (parent, __, { dataSources }) => {
            const { id } = parent;
            const result = await dataSources.db.getReviews();
            const reviews = result.filter(review => {
                return review.taskId === id
            })
            return reviews
        }
    }
}