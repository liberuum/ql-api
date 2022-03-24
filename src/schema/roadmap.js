import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type Roadmap {
        id: ID!
        ownerCuCode: String
        roadMapCode: String
        roadMapName: String
        roadMapStatus: RoadmapStatus
    }

    enum RoadmapStatus {
        TODO
        INPROGRESS
        DONE
    }


    type RoadmapStakeholder {
        id: ID!
        roadMapId: ID!
        stakeholderRoleId: ID!
    }

    type Stakeholder {
        id: ID!
        name: String!
        stakeholderContributorId: ID!
        stakeholderCuCode: String!
    }

    type StakeholderRole {
        id: ID!
        stakeholderRoleName: String!
    }

    type Output {
        id: ID!
        outPutName: String!
        roadMapId: ID!
        outputUrl: String!
    }

    type Milestone {
        id: ID!
        roadMapId: ID!
        outputUrl: String!
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

    type Query {
        roadMaps: [Roadmap]
    }

`;

export const resolvers = {
    Query: {
        roadMaps: (_, __, {}) => {
            return null;
        }
    }
}