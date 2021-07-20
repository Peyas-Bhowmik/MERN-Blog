import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import { createAction } from '../store/asyncMethods/PostMethods'
import Loader from './Loader'


export default function Create(props) {

    const dispatch = useDispatch()

    const { createErrors, redirect,loading } = useSelector(state => state.PostReducer)
    const { user: { _id, name } } = useSelector(state => state.AuthReducer)

    const [currentImage, setCurrentImage] = useState('Choose Image')
    const [imagePreview, setImagePreview] = useState('')
    const [value, setValue] = useState('')
    const [slug, setSlug] = useState('')
    const [slugButton, setSlugButton] = useState(false)
    const [state, setState] = useState({
        title: '',
        description: '',
        image: '',
    })

    const fileHandle = (e) => {

        if (e.target.files.length !== 0) {

            setCurrentImage(e.target.files[0].name)

            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            })

            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleInput = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })

        const createSlug = e.target.value.trim().split(' ').join('-')
        setSlug(createSlug)
    }

    const slugHandle = (e) => {
        setSlugButton(true)
        setSlug(e.target.value)
    }

    const handleURL = (e) => {
        e.preventDefault()
        setSlug(slug.trim().split(' ').join('-'))
    }

    const handleDiscription = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const createPost = e => {
        e.preventDefault()

        const { title, description, image } = state
        const formData = new FormData()

        formData.append('title', title)
        formData.append('body', value)
        formData.append('image', image)
        formData.append('description', description)
        formData.append('slug', slug)
        formData.append('name', name)
        formData.append('id', _id)

        dispatch(createAction(formData))
    }

    useEffect(() => {
        if (redirect) {
            props.history.push("/dashboard")
        }

        if (createErrors.length !== 0) {
            createErrors.map((err) => toast.error(err.msg))
        }

    }, [createErrors, redirect,props.history])
    
    return (
        <div className="create mt-100">
            <Helmet>
                <title>Create new post</title>
                <meta name="description" content="Create new post" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{
                style: {
                    fontSize: '14px'
                },
            }} />
            {!loading ? <div className="container">
                <form onSubmit={createPost}>
                    <div className="row ml-minus-15 mr-minus-15">
                        <div className="col-6 p-15">
                            <div className="card">
                                <h3 className="card__h3">Create a new post</h3>

                                <div className="group">
                                    <label htmlFor="title">Post Title</label>
                                    <input type="text" value={state.title} onChange={handleInput} name="title" id="title" className="group__control" placeholder="Post litle..." />
                                </div>
                                <div className="group">
                                    <label htmlFor="image" className="image__label" >{currentImage}</label>
                                    <input type="file" name="image" onChange={fileHandle} id="image" />
                                </div>
                                <div className="group">
                                    <label htmlFor="body">Post body</label>
                                    <ReactQuill theme="snow" placeholder="Post body..." value={value} id="body" onChange={setValue} />
                                </div>
                                <div className="group">
                                    <label htmlFor="description">Meta Description</label>
                                    <textarea name="description" className="group__control" placeholder="meta description" maxLength="150" defaultValue={state.description} onChange={handleDiscription} id="description" cols="30" rows="10"></textarea>
                                    <p className="length">{state.description ? state.description.length : 0}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 p-15">
                            <div className="card">
                                <div className="group">
                                    <label htmlFor="slug">Post URL</label>
                                    <input type="text" value={slug} name="slug" id="slug" className="group__control" placeholder="Post URL..." onChange={slugHandle} />
                                </div>
                                <div className="group">
                                    {slugButton ? <button onClick={handleURL} className="btn btn-default">Update Slug</button> : ''}
                                </div>
                                <div className="group">
                                    <div className="imagePreview">
                                        {
                                            imagePreview ? <img src={imagePreview} alt="" /> : ''
                                        }
                                    </div>
                                </div>
                                <div className="group">
                                    <input type="submit" value={loading ? '...' : "Create post"} className="btn btn-default btn-block" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div> : <Loader />}
        </div>
    )
}
