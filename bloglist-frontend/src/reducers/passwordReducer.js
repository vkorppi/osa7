


export const setPassword = (password) => {

  return async dispatch => { 

    dispatch({ password: password,type: 'SETPASSWORD'})
  
 
  }
}
  
const reducer = (state = '', action) => {

  switch (action.type) {

  case 'SETPASSWORD':
    return  state=action.password
  default: 
    return state
  }
}

export default reducer