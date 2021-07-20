import React,{useState,useEffect} from 'react'
import BgImage from './BgImage'
import { Helmet } from 'react-helmet'
import {useSelector,useDispatch} from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { postLogin } from '../../store/asyncMethods/AuthMethods'

export default function Login() {
    const dispatch = useDispatch()
    const {loginErrors,loading} = useSelector((state) => state.AuthReducer)

    const [state,setState] = useState({
        email: '',
        password: ''
    })

    const handleInputs = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const userLogin = (e) => {
        e.preventDefault()
        dispatch(postLogin(state))
    }

    useEffect(() => {
        if(loginErrors.length > 0){
            loginErrors.map(error => toast.error(error.msg))
        }
    },[loginErrors])
    return (
        <>
            <Helmet>
                <title>User Login</title>
                <meta name="description" content="User login form" />
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
                            <form onSubmit={userLogin}>
                                <div className="group">
                                    <div className="form-heading">Login</div>
                                </div>
                                <div className="group">
                                    <input type="email" name="email" value={state.email} className="group__control" placeholder="Enter Email Address" onChange={handleInputs} />
                                </div>
                                <div className="group">
                                    <input type="password" name="password" value={state.password} className="group__control" placeholder="Enter Password" onChange={handleInputs} />
                                </div>
                                <div className="group">
                                    <input type="submit" value={loading ? '...' : 'Login'} className="btn btn-default btn-block" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
