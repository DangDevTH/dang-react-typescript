import { graphql } from "../gql";

export const PostFragment = graphql(`
  fragment PostFragment on Post {
      id
      content
      featuredImageUrl
      status
      createDate
      author {
        id
        username
      }
  }
`);
