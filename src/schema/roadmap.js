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
        roadMapId: Int!
        stakeholderRoleId: Int!
    }

    type Stakeholder {
        id: ID!
        name: String!
        stakeholderContributorId: Int!
        stakeholderCuCode: String!
    }

    type StakeholderRole {
        id: ID!
        stakeholderRoleName: String!
    }

    type Output {
        id: ID!
        outPutName: String!
        roadMapId: Int!
        outputUrl: String!
    }

    type Milestone {
        id: ID!
        roadMapId: Int!
        outputUrl: String!
    }

    type Task {
        id: ID!
        parentId: Int!
        taskName: String!
        taskStatus: TaskStatus!
        ownerStakeholderId: Int!
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
        taskId: Int!
        outputUrl: String!
    }

    type Review {
        id: ID!
        taskId: Int!
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