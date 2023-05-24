import { useState, useEffect } from "react";
import { Post } from "./Post";
import { PostType } from "../types/Post";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = await response.json();
      console.log(posts);
      setPosts(posts);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section>
      <h1>K-Posts</h1>
      {posts.map((post: PostType) => {
        return <Post {...post} key={post.id} />;
      })}
    </section>
  );
};
