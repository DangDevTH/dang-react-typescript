import { ReactElement, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Stack,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Divider,
  Link as LinkMUI,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { PAGE_SIZE } from "../../../constants/page-size";
import { useGetPostsUser } from "../../../hooks/useGetPostInPage";
import { useCountPosts } from "../../../hooks/useCountPost";
import { userNameVar } from "../../../constants/all-makevar";
import { ProtectedRouter } from "../../Routes";

const Posts = (): ReactElement => {
  const location = useLocation();
  const username: string = location.pathname.split("/")[2];
  const { data, loading, error, loadMorePosts, refetch } = useGetPostsUser({
    username,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const [page, setPage] = useState<number>(0);
  const { postsCount, countPosts } = useCountPosts(username);

  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);


  const [comments, setComments] = useState<Record<string, string>>({});
  console.log;

  const timeAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diff = Math.abs(now.getTime() - postDate.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} นาทีที่แล้ว`;
    } else if (hours < 24) {
      return `${hours} ชั่วโมงที่แล้ว`;
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return postDate.toLocaleDateString("th-TH", options);
    }
  };

  useEffect(() => {
    if (data?.posts && data?.posts.length > 0) {
      setPage(data.posts.length);
    }
  }, [data]);

  useEffect(() => {
    if (username) {
      userNameVar(username);
      countPosts();
      refetch();
    } else {
      userNameVar(String(""));
      countPosts();
    }
  }, [username, refetch, countPosts]);

  const handleLoadMore = () => {
    loadMorePosts();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            handleLoadMore();
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0, 
      }
    );

    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current);
    }

    return () => {
      if (loadMoreButtonRef.current) {
        observer.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [loading]);

  if (error) return <Typography>เกิดข้อผิดพลาด: {error.message}</Typography>;

  const handleCommentChange = (postId: string, value: string) => {
    setComments((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = (postId: string) => {
    console.log(`โพสต์ ID: ${postId}, ความคิดเห็น: ${comments[postId]}`);
    setComments((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight="bold">
        โพสต์
      </Typography>
      <Box
        sx={{
          overflow: "auto",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "1rem",
        }}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={data?.posts.length < data?.postsCount}
          useWindow={false}
        >
          {data?.posts && data.posts.length > 0 ? (
            [...data.posts]
              .sort(
                (a, b) =>
                  new Date(b.createDate).getTime() -
                  new Date(a.createDate).getTime()
              )
              .map((post) => (
                <Card
                  key={post.id}
                  sx={{ marginBottom: "1.5rem", borderRadius: "8px" }}
                >
                  <CardHeader
                    avatar={<Avatar src={post.author?.avatarUrl} />}
                    title={
                      <LinkMUI
                        variant="inherit"
                        onClick={() => {
                          ProtectedRouter.navigate(`/profile/AAxAx`);
                        }}
                        sx={{ color: "black" }}
                        fontWeight="bold"
                      >
                        {post.author.name}
                      </LinkMUI>
                    }
                    subheader={
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          @{post.author.username}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ marginLeft: "0.5rem" }}
                        >
                          {timeAgo(post.createDate)}
                        </Typography>
                      </Box>
                    }
                  />
                  <CardContent>
                    <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
                      {post.content}
                    </Typography>
                    <Divider sx={{ marginBottom: "1rem" }} />
                    <Stack spacing={1}>
                      <TextField
                        placeholder="เขียนความคิดเห็น..."
                        fullWidth
                        value={comments[post.id] || ""}
                        onChange={(e) =>
                          handleCommentChange(post.id, e.target.value)
                        }
                        size="small"
                      />
                      <Button
                        variant="contained"
                        size="small"
                        disabled={!comments[post.id]?.trim()}
                        onClick={() => handleCommentSubmit(post.id)}
                      >
                        ส่งความคิดเห็น
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))
          ) : (
            <Typography textAlign="center">ไม่มีโพสต์</Typography>
          )}
        </InfiniteScroll>
      </Box>
       {Number(page) < Number(postsCount) && (
      <Button
        ref={loadMoreButtonRef}
        onClick={handleLoadMore}
        disabled={loading || data?.posts.length >= data?.postsCount}
      >
        {loading ? "กำลังโหลด..." : "โหลดเพิ่มเติม"}
      </Button>
      )}
    </Stack>
  );
};

export default Posts;
