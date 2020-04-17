

export const setUrl = (url) => {

  return async dispatch => { 

    await dispatch({ url: url,type: 'SETURL'})
  
  }
}
  
const reducer = (state = '', action) => {

  switch (action.type) {

  case 'SETURL':
    return  state=action.url
  default: 
    return state
  }
}

export default reducer