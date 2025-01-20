import { graphql } from "../gql";

export const ProfileFragment = graphql(`
  fragment ProfileFragment on User {
    id
    name
    username
    profileImage
    backgroundImage
  }
`);
