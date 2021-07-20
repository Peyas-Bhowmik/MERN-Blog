import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import AuthReducer from './reducers/auth'
import {
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
    UpdateImage,
} from './reducers/postReducer'
import {UpdateName} from './reducers/profileReducer'

const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
    UpdateImage,
    UpdateName,
})

const middlewares = [thunk]
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)))

export default Store