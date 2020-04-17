


export const setUsername = (username) => {

  return async dispatch => { 

    dispatch({ username: username,type: 'SETUSERNAME'})
  
 
  }
}
  
const reducer = (state = '', action) => {

  switch (action.type) {

  case 'SETUSERNAME':
    return  state=action.username
  default: 
    return state
  }
}

export default reducer