import React from 'react';
import Comment from '../Comment/Comment';
import './Comments.css';

export default function Comments({ flyer = {}, flyerComments, users = [] }) {
  const flyerCreator = users.filter(user => user.id == flyer.creator_id)
  const publishComment = Boolean(flyer.publish_comment)
    ? flyer.publish_comment
    : "none"
  return(
    <div className="Comments">
       <Comment user={flyerCreator} isCreator={true} comment={publishComment} modified={flyer.modified} />
    </div>
  )
}
