
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore,combineReducers,applyMiddleware   } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authorReducer from './reducers/authorReducer'
import titleReducer from  './reducers/titleReducer'
import urlReducer from  './reducers/urlReducer'
import usernameReducer from  './reducers/usernameReducer'
import passwordReducer from  './reducers/passwordReducer'
import accountReducer from  './reducers/accountReducer'
import userReducer from  './reducers/userReducer'
import inputcomReducer from  './reducers/inputcomReducer'


const reducer = combineReducers({
  "notification": notificationReducer,
  "blog":blogReducer,
  "author":authorReducer,
  "title":titleReducer,
  "url":urlReducer,
  "username":usernameReducer,
  "password":passwordReducer,
  "account":accountReducer,
  "user":userReducer,
  "comment":inputcomReducer
})



const store = createStore( reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store