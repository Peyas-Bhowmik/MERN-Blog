import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import BgImage from './BgImage'
import { postRegester } from '../../store/asyncMethods/AuthMethods'
import toast, { Toaster } from 'react-hot-toast'

export default function Regester(props) {
    const { loading, registerErrors, user } = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInputs = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const userRegester = async (e) => {
        e.preventDefault()
        dispatch(postRegester(state))
    }

    useEffect(() => {
        if (registerErrors.length > 0) {
            registerErrors.map(error => toast.error(error.msg))
        }
        // if (user) {
        //     props.history.push('/dashboard')
        // }
    }, [registerErrors, user])

    return (
        <>
            <Helmet>
                <title>User regester</title>
                <meta name="description" content="User regester form" />
            </Helmet>
            <div className="row mt-80">
                <div className="col-8">
                    <BgImage />
                    <Toaster position="top-right" reverseOrder={false} toastOptions={{
                        style: {
                            fontSize: '14px'
                        },
                    }} />
                </div>
                <div className="col-4">
                    <div className="account">
                        <div className="account__section">
                            <form onSubmit={userRegester}>
                                <div className="group">
                                    <div className="form-heading">Regester</div>
                                </div>
                                <div className="group">
                                    <input type="text" value={state.name} onChange={handleInputs} name="name" className="group__control" placeholder="Enter Name" />
                                </div>
                                <div className="group">
                                    <input type="email" value={state.email} onChange={handleInputs} name="email" className="group__control" placeholder="Enter Email Address" />
                                </div>
                                <div className="group">
                                    <input type="password" value={state.password} onChange={handleInputs} name="password" className="group__control" placeholder="Enter Password" />
                                </div>
                                <div className="group">
                                    <input type="submit" className="btn btn-default btn-block" value={loading ? '...' : 'Regester'} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
