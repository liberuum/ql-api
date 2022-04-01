import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type Roadmap {
        id: ID!
        ownerCuId: ID
        roadmapCode: String
        roadmapName: String
        comments: String
        roadmapStatus: RoadmapStatus
        roadmapStakeholder: [RoadmapStakeholder]
        output: [Output]
        milestone: [Milestone]
    }

    enum RoadmapStatus {
        Todo
        InProgress
        Done
    }


    type RoadmapStakeholder {
        id: ID!
        stakeholderId: ID!
        roadmapId: ID!
        stakeholderRoleId: ID!
        stakeholderRole: [StakeholderRole]
    }

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

    type Output {
        id: ID!
        name: String!
        roadmapId: ID!
        outputUrl: String!
    }

    type Milestone {
        id: ID!
        roadmapId: ID!
        taskId: ID!
    }

    type Task {
        id: ID!
        parentId: ID!
        taskName: String!
        taskStatus: TaskStatus!
        ownerStakeholderId: ID!
        startDate: String!
        target: String!
        completedPercentage: Float!
        confidenceLevel: ConfidenceLevel!
        comments: String!
    }

    enum TaskStatus {
        TO_DO
        IN_PROGRESS
        DONE
        WONT_DO
        BLOCKED
    }
    
    enum ConfidenceLevel {
        HIGH
        MEDIUM
        LOW
    }

    type TaskOutput {
        id: ID!
        taskId: ID!
        outputUrl: String!
    }

    type Review {
        id: ID!
        taskId: ID!
        reviewDate: String!
        reviewOutcome: ReviewOutcome!
    }

    enum ReviewOutcome {
        RED
        YELLOW
        GREEN
    }

    input RoadmapFilter {
        id: ID
        ownerCuId: ID
        roadmapCode: String
        roadmapName: String
        comments: String
        roadmapStatus: RoadmapStatus
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

    type Query {
        roadmaps: [Roadmap]
        roadmap(filter: RoadmapFilter): [Roadmap]
        roadmapStakeholders: [RoadmapStakeholder]
        roadmapStakeholder(filter: RoadmapStakeholderFilter): [RoadmapStakeholder]
        stakeholders: [Stakeholder]
        stakeholder(filter: StakeholderFilter): [Stakeholder]
        stakeholderRoles: [StakeholderRole]
        stakeholderRole(filter: StakeholderRoleFilter): [StakeholderRole]
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
    }
}