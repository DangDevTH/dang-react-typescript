import { ApolloCache } from "@apollo/client";
import { Post, PostsQueryVariables } from "../gql/graphql";
import { getPostsDocument } from "../hooks/useGetPostInPage";

interface PostsQueryResult {
    posts: Post[]; 
  }
export const updateLastPost = (
  cache: ApolloCache<any>,
  postAll: Post,
  variables: PostsQueryVariables
) => {
  const existingData = cache.readQuery<PostsQueryResult>({
    query: getPostsDocument,
    variables,
  });


  const posts = existingData?.posts ? [...existingData.posts] : [];

  const cachedPostIndex = posts.findIndex((post) => post.id === postAll.id);

  if (cachedPostIndex === -1) {
    return;
  }


  const cachedPost = posts[cachedPostIndex];
  const cachedPostCopy = { ...cachedPost, ...postAll };
  posts[cachedPostIndex] = cachedPostCopy;

  cache.writeQuery({
    query: getPostsDocument,
    variables,
    data: {
      posts,
    },
  });
};
