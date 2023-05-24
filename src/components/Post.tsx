import { useRef, useState } from "react";

import { Comment } from "./Comment";

import { PostType } from "../types/Post";
import { CommentType } from "../types/Comment";

import "./Post.css";

export const Post: React.FC<PostType> = ({ ...post }) => {
  const [comments, setComments] = useState([]);

  const showCommentsForPost = async (postId: string) => {
    if (comments.length > 0) {
      // We already have comments for this post, so don't fetch them again.
      const firstComment = commentListRef.current?.firstChild as HTMLLIElement;
      firstComment.scrollIntoView({ behavior: "smooth" });

      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const comments = await response.json();
      console.log(comments);
      setComments(comments);
    } catch (e) {
      console.error(e);
    }
  };

  const commentListRef = useRef<HTMLUListElement>(null);

  const getLikesFromLocalStorage = () => {
    const likes = JSON.parse(localStorage.getItem("likes") ?? "{}");
    return likes;
  };

  const getLikesCountById = (postId: string) => {
    const likes = getLikesFromLocalStorage();
    return likes[postId] !== undefined ? likes[postId.toString()] : 0;
  };

  const [likesCount, setLikesCount] = useState(
    getLikesCountById(post.id.toString())
  );

  // TODO: This is super silly but we are trying to prevent users from liking a post more than once per session.
  // We don't have user IDs that I am aware of, so it's difficult to track if a user has already liked a post.
  // This is totally temporary and I'm just trying to prevent a lot of likes from a single user.
  const [likesThisSession, setLikesThisSession] = useState<string[]>([]);

  const likePost = (postId: string) => {
    if (likesThisSession.includes(postId)) {
      alert(
        "You've already liked this post! Refesh the page to like it again."
      );
      return;
    }

    const likes = getLikesFromLocalStorage();
    if (likes[postId] !== undefined) {
      likes[postId] = likes[postId] + 1;
    } else {
      likes[postId] = 1;
    }

    localStorage.setItem("likes", JSON.stringify(likes));
    setLikesCount(getLikesCountById(postId));

    setLikesThisSession([...likesThisSession, postId]);
  };

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <div style={{ marginBottom: "1rem" }} data-testid="likes">
          <button
            role="button"
            data-testid="like-button"
            onClick={() => {
              likePost(post.id.toString());
            }}
          >
            Like this post!
          </button>{" "}
          <span>Number of likes: {likesCount}</span>
        </div>
        <button
          onClick={() => {
            showCommentsForPost(post.id.toString());
          }}
        >
          Show Comments
        </button>
        {comments.length > 0 && (
          <div>
            <h3>Comments</h3>
            <ul ref={commentListRef}>
              {comments.map((comment: CommentType) => {
                return <Comment {...comment} key={comment.id} />;
              })}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
};
