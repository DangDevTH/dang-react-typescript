import { graphql } from '../gql';
import { PostFragment } from './../fragments/post.fragment';
import { useMutation } from "@apollo/client";

const createPostDocument = graphql(`
  mutation CreatePost($createPostInputDto: CreatePostInputDto!) {
    createPost(createPostInputDto: $createPostInputDto) {
      ...PostFragment
    }
  }
`);

const useCreatePost = (username: string) => {
  return useMutation(createPostDocument, {
    update(cache, { data }) {
      const newPost = data?.createPost;

      // ตรวจสอบว่าข้อมูลใหม่เป็นของผู้ใช้ปัจจุบันหรือไม่
      if (newPost?.author.username !== username) {
        return; // ถ้าไม่ตรงกัน ไม่ทำการอัปเดตแคช
      }

      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: newPost,
              fragment: PostFragment,
              fragmentName: "PostFragment",
            });

            return [...existingPosts, newPostRef]; // เพิ่มเฉพาะโพสต์ของผู้ใช้ปัจจุบัน
          },
        },
      });
    },
  });
};

export { useCreatePost };
