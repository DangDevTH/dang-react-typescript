import { Post } from './../gql/graphql';
import { ApolloCache } from "@apollo/client";
import { getPostsDocument } from "../hooks/useGetPostInPage";
import { PAGE_SIZE } from "../constants/page-size";

interface GetPostsResponse {
    posts: Post[];
}
export const updatePosts = (cache: ApolloCache<any>, post:Post) => {
    const postsQueryOptions = {
        query: getPostsDocument,
        variables: {
            username: post.author.username,
            skip: 0,
            limit: PAGE_SIZE,
        },
    };

    const posts = cache.readQuery<GetPostsResponse>({ ...postsQueryOptions });
    cache.writeQuery({
        ...postsQueryOptions,
        data: {
            posts: (posts?.posts || []).concat(post),
        },
    });
};