import { SET_PROFILE_ERRORS, RESER_PROFILE_ERRORS } from '../types/profileTypes'

const initState = {
    updateErrors: []
}
export const UpdateName = (state = initState, action) => {
    const { type, payload } = action
    if (type === SET_PROFILE_ERRORS) {
        return {
            ...state,
            updateErrors: payload
        }
    } else if(type === RESER_PROFILE_ERRORS){
        return {
            ...state,
            updateErrors: []
        }
    } else {
        return state
    }
}