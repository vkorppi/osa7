
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { setUsername } from '../reducers/usernameReducer'
import { setPassword } from '../reducers/passwordReducer'

export const sendCreds = (username,password) => {

  return async dispatch => { 

    try {

      const loggedUser = await loginService.sendUserCreds({
        username, password,
      })
  
      dispatch(setNotification(`User ${loggedUser.name} was authenticated successfully`))   
            
      window.localStorage.setItem('UserWithSession', JSON.stringify(loggedUser)      ) 
  
      console.log(loggedUser)

      dispatch({ loggedUser: loggedUser,type: 'SETACCOUNT'})
  
      dispatch(setUsername(''))
      dispatch(setPassword(''))

    }
    catch (exception) {
        
      dispatch(setNotification(`Login failed`))
               
    }
  
    
  }
}

export const setAccount = (account) => {

  return async dispatch => { 
    dispatch({ loggedUser: account,type: 'SETACCOUNT'})
  }

}

const reducer = (state = '', action) => {
  
  switch (action.type) {
  
  case 'SETACCOUNT':
    return  state=action.loggedUser
  default: 
    return state
  }
}
  
export default reducer