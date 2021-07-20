import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, CLOSE_LOADER, SET_MESSAGE } from '../store/types/PostTypes'
import { fetchPosts } from '../store/asyncMethods/PostMethods'
import { BsPencil, BsArchive, BsImage } from 'react-icons/bs'
import Loader from './Loader'
import Sidebar from './Sidebar'
import Pagination from './Pagination'

export default function DashBoard() {

    const dispatch = useDispatch()

    const { message, redirect, loading } = useSelector(state => state.PostReducer)
    const { user: { _id }, token } = useSelector(state => state.AuthReducer)
    const { posts, count, perPage } = useSelector(state => state.FetchPosts)
    let { page } = useParams()
    if (page === undefined) {
        page = 1;
    }
    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE })
        }

        if (message) {
            toast.success(message)
            dispatch({ type: REMOVE_MESSAGE })
        }
    }, [message,dispatch,redirect])

    useEffect(() => {
        dispatch(fetchPosts(_id, page))
    },[page,dispatch,_id])

    const deletePost = async (id) => {
        const confirm = window.confirm("Are you really want to delete the post")
        if (confirm) {
            dispatch({ type: SET_LOADER })
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data: {msg}} = await axios.get(`/delete/${id}`, config)
                dispatch(fetchPosts(_id, page))
                dispatch({ type: CLOSE_LOADER })
                dispatch({type: SET_MESSAGE,payload: msg})
            } catch (error) {
                dispatch({ type: CLOSE_LOADER })
                console.log(error);
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>User DashBoard</title>
                <meta name="description" content="User DashBoard" />
            </Helmet>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{
                style: {
                    fontSize: '14px'
                },
            }} />
            <div className="container mt-100">
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-3 p-15">
                        <Sidebar />
                    </div>
                    <div className="col-9 p-15">
                        {!loading ? posts.length > 0 ? posts.map(post => (
                            <div className="dashboard__posts" key={post._id}>
                                <div className="dashboard__posts__title">
                                    <Link to={`/details/${post.slug}`}>{post.title}</Link>
                                    <span>{moment(post.updatedAt).fromNow()}</span>
                                </div>
                                <div className="dashboard__posts__links">
                                    <Link to={`/updateImage/${post._id}`}><BsImage className="icon" /></Link>
                                    <Link to={`/edit/${post._id}`}><BsPencil className="icon" /></Link>
                                    <BsArchive onClick={() => deletePost(post._id)} className="icon" />
                                </div>
                            </div>
                        )) : 'You dont have any post' : <Loader />}
                        <Pagination path="dashboard" page={page} perPage={perPage} count={count} />
                    </div>
                </div>
            </div>
        </>
    )
}
