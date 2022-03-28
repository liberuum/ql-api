import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type SocialMediaChannels {
        id: ID!
        cuCode: String
        forumTag: String
        twiter: String
        youtube: String
        discord: String
        linkedIn: String
    }

    type TwitterFollowers {
        id: ID!
        twitterAccountId: ID!
        twitterAccount: String!
        month: String!
        followerCount: Int!
    }

    type YoutubeFollowers {
        id: ID!
        youtubeId: ID!
        youtubeAccount: String!
        month: String!
        followerCount: Int!
    }

    extend type Query {
        socialMediaChannels: [SocialMediaChannels],
        socialMediaChannels(cuCode: String): [SocialMediaChannels]
    }

`;

export const resolvers = {
    Query: {
        socialMediaChannels: async (_, __, {}) => {
            // return all social media channels from every cu
            return null
        },
        socialMediaChannels: async (_, {cuCode}, { }) => {
            // return social media channels of cuCode
            return null
        }
    }
}