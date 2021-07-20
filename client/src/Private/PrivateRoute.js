import React from 'react'
import {useSelector} from 'react-redux'
import {Route,Redirect} from 'react-router-dom'

export default function PrivateRoute(props) {
    const {user} = useSelector(state => state.AuthReducer)
    return user ? <Route path={props.path} component={props.component}/> : <Redirect to="/login"/>
}