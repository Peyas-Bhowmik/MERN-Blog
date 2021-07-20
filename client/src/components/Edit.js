import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast'
import ReactQuill from 'react-quill'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost, updateAction } from '../store/asyncMethods/PostMethods'
import { POST_RESET, RESET_UPDATE_ERRORS } from '../store/types/PostTypes'
import Loader from './Loader'

export default function Edit() {
    const { push } = useHistory()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { loading, redirect } = useSelector(state => state.PostReducer)
    const { post, postStatus } = useSelector(state => state.FetchPost)
    const { editErrors } = useSelector(state => state.UpdatePost)
    const [value, setValue] = useState('')
    const [state, steState] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        if (postStatus) {
            steState({
                title: post.title,
                description: post.description
            })
            setValue(post.body)
            dispatch({ type: POST_RESET })
        } else {
            dispatch(fetchPost(id))
        }
    }, [post,dispatch,id,postStatus])

    useEffect(() => {
        if (editErrors.length !== 0) {
            editErrors.map(error => (toast.error(error.msg)))
            dispatch({type: RESET_UPDATE_ERRORS})
        }
    }, [editErrors,dispatch])

    useEffect(() => {
        if (redirect) {
            push('/dashboard')
        }
    }, [redirect,push])

    const updatePost = (e) => {
        e.preventDefault()
        dispatch(updateAction({
            title: state.title,
            body: value,
            description: state.description,
            id: post._id,
        }))
    }
    return !loading ? <div className="mt-100">
        <Helmet>
            <title>Edit post</title>
            <meta name="description" content="Edit post" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false} toastOptions={{
            style: {
                fontSize: '14px'
            },
        }} />
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <h3 className="card__h3">Edit post</h3>
                        <form onSubmit={updatePost}>
                            <div className="group">
                                <label htmlFor="title">Post Title</label>
                                <input type="text" name="title" id="title" className="group__control" placeholder="Post title" value={state.title} onChange={(e) => steState({ ...state, title: e.target.value })} />
                            </div>
                            <div className="group">
                                <label htmlFor="body">Post body</label>
                                <ReactQuill theme="snow" placeholder="Post body..." value={value} id="body" onChange={setValue} />
                            </div>
                            <div className="group">
                                <label htmlFor="description">Meta Description</label>
                                <textarea name="description" className="group__control" placeholder="meta description" maxLength="150" defaultValue={state.description} onChange={(e) => steState({ ...state, description: e.target.value })} onKeyUp={e => steState({ ...state, desctiption: e.target.value })} id="description" cols="30" rows="10"></textarea>
                                <p className="length">{state.description ? state.description.length : 0}</p>
                            </div>
                            <div className="group">
                                <input type="submit" value="Edit post" className="btn btn-default btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div> : <Loader />
}
