import { gql } from "apollo-server-core";

export const typeDefs = gql`

    type SocialMediaChannels {
        id: Int!
        cuCode: String!
        forumTag: String!
        twiter: String!
        youtube: String!
        discord: String!
        linkedId: String!
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