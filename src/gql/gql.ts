/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment PostFragment on Post {\n      id\n      content\n      featuredImageUrl\n      status\n      createDate\n      author {\n        id\n        username\n      }\n  }\n": types.PostFragmentFragmentDoc,
    "\n  fragment ProfileFragment on User {\n    id\n    name\n    username\n    profileImage\n    backgroundImage\n  }\n": types.ProfileFragmentFragmentDoc,
    "\n  mutation CreatePost($createPostInputDto: CreatePostInputDto!) {\n    createPost(createPostInputDto: $createPostInputDto) {\n      ...PostFragment\n    }\n  }\n": types.CreatePostDocument,
    "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n": types.MeDocument,
    "\n  query Posts($username: String!, $skip: Int!, $limit: Int!) {\n    posts(PaginationArgsDto: { username: $username, skip: $skip, limit: $limit }) {\n      id\n      content\n      featuredImageUrl\n      createDate\n      status\n      author {\n        id\n        name\n        username\n      }\n    }\n  }\n": types.PostsDocument,
    "\n  query Username($username: String!) {\n    username(FindUserInput: { username: $username }) {\n        id\n        username\n        name\n        profileImage\n        backgroundImage\n    }\n  }\n": types.UsernameDocument,
    "\n  mutation UpdateUser($updateUserInput: UpdateUserInput!, $uploadUserImagesInputDto: UploadUserImagesInputDto!){\n    updateUser(\n        updateUserInput: $updateUserInput\n        uploadUserImagesInputDto: $uploadUserImagesInputDto\n    ) {\n        id\n        name\n        username\n        profileImage\n        backgroundImage\n    }\n}\n": types.UpdateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostFragment on Post {\n      id\n      content\n      featuredImageUrl\n      status\n      createDate\n      author {\n        id\n        username\n      }\n  }\n"): (typeof documents)["\n  fragment PostFragment on Post {\n      id\n      content\n      featuredImageUrl\n      status\n      createDate\n      author {\n        id\n        username\n      }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProfileFragment on User {\n    id\n    name\n    username\n    profileImage\n    backgroundImage\n  }\n"): (typeof documents)["\n  fragment ProfileFragment on User {\n    id\n    name\n    username\n    profileImage\n    backgroundImage\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($createPostInputDto: CreatePostInputDto!) {\n    createPost(createPostInputDto: $createPostInputDto) {\n      ...PostFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($createPostInputDto: CreatePostInputDto!) {\n    createPost(createPostInputDto: $createPostInputDto) {\n      ...PostFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts($username: String!, $skip: Int!, $limit: Int!) {\n    posts(PaginationArgsDto: { username: $username, skip: $skip, limit: $limit }) {\n      id\n      content\n      featuredImageUrl\n      createDate\n      status\n      author {\n        id\n        name\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query Posts($username: String!, $skip: Int!, $limit: Int!) {\n    posts(PaginationArgsDto: { username: $username, skip: $skip, limit: $limit }) {\n      id\n      content\n      featuredImageUrl\n      createDate\n      status\n      author {\n        id\n        name\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Username($username: String!) {\n    username(FindUserInput: { username: $username }) {\n        id\n        username\n        name\n        profileImage\n        backgroundImage\n    }\n  }\n"): (typeof documents)["\n  query Username($username: String!) {\n    username(FindUserInput: { username: $username }) {\n        id\n        username\n        name\n        profileImage\n        backgroundImage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($updateUserInput: UpdateUserInput!, $uploadUserImagesInputDto: UploadUserImagesInputDto!){\n    updateUser(\n        updateUserInput: $updateUserInput\n        uploadUserImagesInputDto: $uploadUserImagesInputDto\n    ) {\n        id\n        name\n        username\n        profileImage\n        backgroundImage\n    }\n}\n"): (typeof documents)["\n  mutation UpdateUser($updateUserInput: UpdateUserInput!, $uploadUserImagesInputDto: UploadUserImagesInputDto!){\n    updateUser(\n        updateUserInput: $updateUserInput\n        uploadUserImagesInputDto: $uploadUserImagesInputDto\n    ) {\n        id\n        name\n        username\n        profileImage\n        backgroundImage\n    }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;