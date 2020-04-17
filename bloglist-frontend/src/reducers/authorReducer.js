

export const setAuthor = (author) => {

  return async dispatch => { 

    await dispatch({ author: author,type: 'SETAUTHOR'})
  
  }
}
  
const reducer = (state = '', action) => {

  switch (action.type) {

  case 'SETAUTHOR':
    return  state=action.author
  default: 
    return state
  }
}

export default reducer