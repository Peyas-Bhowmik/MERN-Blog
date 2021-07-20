import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import toast, { Toaster } from 'react-hot-toast'
import Sidebar from './Sidebar'
import { updateNameAction } from '../store/asyncMethods/profileMethods'
import {RESER_PROFILE_ERRORS} from '../store/types/profileTypes'

export default function UpdateName() {
    const {push} = useHistory()
    const [userName,setUserName] = useState('')
    const {user: {name, _id}} = useSelector(state => state.AuthReducer)
    const { redirect } = useSelector(state => state.PostReducer)
    const {updateErrors} = useSelector(state => state.UpdateName)
    const dispatch = useDispatch()
    
    useEffect(() => {
        setUserName(name)
    },[name])

    useEffect(() => {
        if(updateErrors.length !== 0) {
            updateErrors.map(error => toast.error(error.msg))
            dispatch({type: RESER_PROFILE_ERRORS})
        }
    },[updateErrors,dispatch])

    useEffect(() => {
        if(redirect){
            push('/dashboard')
        }
    },[redirect,push])

    const updateNameMethod = e => {
        e.preventDefault()
        dispatch(updateNameAction({ name: userName, id: _id}))
    }
    return (
        <div className="container mt-100">
            <Helmet>
                <title>Update Name</title>
                <meta name="description" content="Update the user name" />
            </Helmet>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{
                style: {
                    fontSize: '14px'
                },
            }} />
            <div className="row ml-minus-15 mr-minus-15">
                <div className="col-3 p-15">
                    <Sidebar />
                </div>
                <div className="col-9 p-15">
                    <div className="card">
                        <h3 className="card__h3">Update Name</h3>
                        <form onSubmit={updateNameMethod}>
                            <div className="group">
                                <input type="text" onChange={e => setUserName(e.target.value)} name="" className="group__control" placeholder="Name..." value={userName} />
                            </div>
                            <div className="group">
                                <input type="submit" value="Update Name" className="btn btn-default btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
