import React from 'react'
import moment from 'moment'

export default function Comments({ comments }) {
    return comments.length > 0 ? comments.map(comment => (
        <div key={comment._id} className="commentSection" >
            <div className="post__header">
                <div className="post__header__avater">
                    {comment.userName ? comment.userName[0] : ''}
                </div>
                <div className="post__header__user">
                    <span>{comment.userName}</span>
                    <span>{moment(comment.updatedAt).fromNow()}</span>
                </div>
            </div>
            <div className="comment__body">{comment.comment}</div>
        </div>
    )) : <span className="no__comments">No Comments</span>
}
