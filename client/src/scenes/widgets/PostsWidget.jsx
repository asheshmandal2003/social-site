import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (isProfile) {
      const getUserPosts = async () => {
        const userPosts = await fetch(
          `http://localhost:3001/posts/${userId}/posts`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await userPosts.json();
        dispatch(setPosts({ posts: data }));
      };
      getUserPosts();
    } else {
      const getPosts = async () => {
        const feedPosts = await fetch("http://localhost:3001/posts", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await feedPosts.json();
        dispatch(setPosts({ posts: data }));
      };
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstname,
          lastname,
          description,
          location,
          userPicturePath,
          picturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstname} ${lastname}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPictureath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};
export default PostsWidget;
