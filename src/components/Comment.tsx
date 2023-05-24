import { CommentType } from "../types/Comment";

import "./Comment.css";

export const Comment: React.FC<CommentType> = ({ ...comment }) => {
  return (
    <li>
      <h4>{comment.name}</h4>
      <div>{comment.email} says:</div>
      <p>{comment.body}</p>
    </li>
  );
};
