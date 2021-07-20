import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {LOGOUT} from '../store/types/UserTypes'

export default function Navbar() {
    const { user } = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()
    const logout = () => {
        localStorage.removeItem('mytoken')
        dispatch({type: LOGOUT})
    }
    const Links = user ? <div className="navbar__right">
        <li>
            <Link to="/create">Create Post</Link>
        </li>
        <li>
            <Link to="/dashboard/1">{user.name}</Link>
        </li>
        <li>
            <span onClick={logout}>Logout</span>
        </li>
    </div> : <div className="navbar__right">
        <li>
            <Link to="/login">Login</Link>
        </li>
        <li>
            <Link to="/regester">Regester</Link>
        </li>
    </div>
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__row">
                    <div className="navbar__left">
                        <Link to="/">
                            <img src='/images/logo.png' alt='' />
                        </Link>
                    </div>
                    {Links}
                </div>
            </div>
        </div>
    )
}
