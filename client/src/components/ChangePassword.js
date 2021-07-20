import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import Sidebar from './Sidebar'
import { updatePasswordAction } from '../store/asyncMethods/profileMethods'
import Loader from './Loader'
import { RESER_PROFILE_ERRORS } from '../store/types/profileTypes'

export default function ChangePassword() {
    const {push} = useHistory()
    const dispatch = useDispatch()
    const { redirect, loading } = useSelector(state => state.PostReducer)
    const { updateErrors } = useSelector(state => state.UpdateName)
    const {user: {_id}} = useSelector(state => state.AuthReducer)
    const [state, setState] = useState({
        current: '',
        newPassword: '',
        userId: null,
    })

    const updatePassword = (e) => {
        e.preventDefault()
        dispatch(updatePasswordAction({current: state.current,newPassword: state.newPassword,userId: _id}))
    }

    useEffect(() => {
        if (updateErrors.length !== 0) {
            updateErrors.map(error => toast.error(error.msg))
            dispatch({ type: RESER_PROFILE_ERRORS })
        }
    }, [updateErrors,dispatch])

    useEffect(() => {
        if(redirect){
            push('/dashboard')
        }
    },[redirect,push])


    return !loading ?
        <div className="container mt-100">
            <Helmet>
                <title>Change Password</title>
                <meta name="description" content="Change Password" />
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
                        <h3 className="card__h3">Change Password</h3>
                        <form onSubmit={updatePassword}>
                            <div className="group">
                                <input type="password" name="" className="group__control" placeholder="Current Password" onChange={e => setState({ ...state, current: e.target.value })} value={state.current} />
                            </div>
                            <div className="group">
                                <input type="password" name="" className="group__control" placeholder="New Password" onChange={e => setState({ ...state, newPassword: e.target.value })} value={state.newPassword} />
                            </div>
                            <div className="group">
                                <input type="submit" value={loading ? '...' : "Change Password"} className="btn btn-default btn-block" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> : <Loader />
}
