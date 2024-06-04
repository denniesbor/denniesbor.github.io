import React, { useState } from "react";

function Comment({ comment, comments }) {
  const [reply, setReply] = useState("");
  const [name, setName] = useState("");

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    // Send reply and name to the server...
  };

  const nestedComments = comments.filter((c) => c.parent === comment.id);

  return (
    <div>
      <p>{comment.body}</p>
      {nestedComments.length > 0 && <CommentsList comments={nestedComments} />}
      <form onSubmit={handleReplySubmit}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Your name"
          required
        />
        <textarea
          value={reply}
          onChange={handleReplyChange}
          placeholder="Your reply"
          required
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
}

function CommentsList({ comments }) {
  const topLevelComments = comments.filter((c) => c.parent === null);

  return (
    <div>
      {topLevelComments.map((comment) => (
        <Comment key={comment.id} comment={comment} comments={comments} />
      ))}
    </div>
  );
}

export default CommentsList;
