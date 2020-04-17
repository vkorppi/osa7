


export const setNotification = (message) => {

  return async dispatch => { 

    await dispatch({ notification: message,type: 'SETNOTIFICATION'})
  
    setTimeout(() => {
      dispatch({ notification: '',type: 'SETNOTIFICATION'})
    }, 5000)
    
  }
}
  
const reducer = (state = '', action) => {

  switch (action.type) {

  case 'SETNOTIFICATION':
    return  state=action.notification
  default: 
    return state
  }
}

export default reducer