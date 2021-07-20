import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { postDetails, postComment } from '../store/asyncMethods/PostMethods'
import Loader from './Loader'
import Comments from './Comments'

export default function Details() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { loading, details, comments } = useSelector(state => state.PostReducer)
    const { user } = useSelector(state => state.AuthReducer)
    const [comment, setComment] = useState('')

    const addComment = (e) => {
        e.preventDefault()
        dispatch(postComment({ id: details._id, comment, userName: user.name }))
        setComment('')
        dispatch(postDetails(id))
    }

    useEffect(() => {
        dispatch(postDetails(id))
    }, [id,dispatch])



    return (
        <div className="container">
            <Helmet>
                <title>{details.title}</title>
            </Helmet>
            <div className="row mt-100">
                <div className="col-8">{
                    !loading ?
                        <div className="post__details">
                            <div className="post__header">
                                <div className="post__header__avater">
                                    {details.userName ? details.userName[0] : ''}
                                </div>
                                <div className="post__header__user">
                                    <span>{details.userName}</span>
                                    <span>{moment(details.updatedAt).format('MMM Do YY')}</span>
                                </div>
                            </div>
                            <div className="post__body">
                                <h1 className="post__body__title">{details.title}</h1>
                                <div className="post__body__details">{details.body}</div>
                                <div className="post__body__image">
                                    <img src={`/images/${details.image}`} alt={details.image} />
                                </div>
                            </div>
                            <h3 className="post__body__title" style={{marginBottom: '10px',marginTop: '30px'}}>Comments</h3>
                            {user ? (
                                <>
                                    <div className="post__comment" style={{ marginBottom: '20px' }}>
                                        <form onSubmit={addComment}>
                                            <div className="group">
                                                <input type="text" className="group__control" placeholder="Write a comment" onChange={e => setComment(e.target.value)} value={comment} />
                                            </div>
                                            <div className="group" style={{marginTop: '15px'}}>
                                                <input type="submit" value={loading ? '...' : "Create comment"} className="btn btn-default" />
                                            </div>
                                        </form>
                                    </div>
                                </>
                            ) : ''}
                            <Comments comments={comments} />
                        </div> : <Loader />
                }</div>
            </div>
        </div>
    )
}
