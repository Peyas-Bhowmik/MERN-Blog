import jwtDecode from 'jwt-decode'
import { SET_LOADER, CLOSE_LOADER, REGESTER_ERRORS, SET_TOKEN,LOGOUT,LOGIN_ERRORS } from '../types/UserTypes'
const initState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    token: '',
    user: '',
}
const verfyToken = (token) => {
    const decodeToken = jwtDecode(token)
    const expiresIn = new Date(decodeToken.exp * 1000)
    if (new Date() > expiresIn) {
        localStorage.removeItem('mytoken')
        return null;
    } else {
        return decodeToken
    }
}
const token = localStorage.getItem('mytoken')
if (token) {
    const decoded = verfyToken(token)
    if(decoded) {
        initState.token = token
        const { user } = decoded
        initState.user = user
    }
}
const AuthReducer = (state = initState, action) => {
    if (action.type === SET_LOADER) {
        return { ...state, loading: true }
    } else if (action.type === CLOSE_LOADER) {
        return { ...state, loading: false }
    } else if (action.type === REGESTER_ERRORS) {
        return { ...state, registerErrors: action.payload }
    } else if (action.type === SET_TOKEN) {
        const decoded = verfyToken(action.payload)
        const { user } = decoded
        return { ...state, token: action.payload, user: user, loginErrors: [], registerErrors: [] }
    } else if(action.type === LOGOUT) {
        return {...state,token: '',user: ''}
    } else if(action.type === LOGIN_ERRORS) {
        return {...state, loginErrors: action.payload}
    } else {
        return state;
    }
}

export default AuthReducer