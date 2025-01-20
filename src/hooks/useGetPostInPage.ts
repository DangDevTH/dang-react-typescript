import { useQuery, gql } from "@apollo/client";
import { PaginationArgsDto } from "../gql/graphql";

export const getPostsDocument = gql`
  query Posts($username: String!, $skip: Int!, $limit: Int!) {
    posts(PaginationArgsDto: { username: $username, skip: $skip, limit: $limit }) {
      id
      content
      featuredImageUrl
      createDate
      status
      author {
        id
        name
        username
      }
    }
  }
`;

const useGetPostsUser = (variables: PaginationArgsDto) => {
  const query = useQuery(getPostsDocument, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  const loadMorePosts = () => {
    if (query.fetchMore) {
      query.fetchMore({
        variables: {
          skip: query.data?.posts.length || 0,
          limit: variables.limit,
          username: variables.username,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            ...prevResult,
            posts: [...prevResult.posts, ...fetchMoreResult.posts],
          };
        },
      });
    }
  };

  return {
    data: query.data,
    loading: query.loading,
    error: query.error,
    loadMorePosts,
    refetch: query.refetch, // เพิ่ม refetch ที่ได้จาก useQuery
  };
};

export { useGetPostsUser };
