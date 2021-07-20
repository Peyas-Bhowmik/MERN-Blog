import axios from 'axios'
import { SET_LOADER, CLOSE_LOADER, REGESTER_ERRORS, SET_TOKEN,LOGIN_ERRORS } from '../types/UserTypes'

export const postRegester = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data } = await axios.post('/regester', state, config)
            dispatch({ type: CLOSE_LOADER })
            localStorage.setItem('mytoken', data.token)
            dispatch({ type: SET_TOKEN, payload: data.token })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: REGESTER_ERRORS, payload: error.response.data.error })
            console.log(error.response);
        }
    }
}

export const postLogin = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            dispatch({ type: SET_LOADER })
            const {data} = await axios.post('/login',state,config)
            dispatch({type: CLOSE_LOADER})
            localStorage.setItem("mytoken",data.token)
            dispatch({ type: SET_TOKEN, payload: data.token })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.error })
            console.log(error.response);
        }
    }
}