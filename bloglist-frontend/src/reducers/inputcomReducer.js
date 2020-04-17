

export const setComment = (comment) => {

  return async dispatch => { 

    await dispatch({ comment: comment,type: 'SETCOMMENT'})
  
  }
}
  
const reducer = (state = '', action) => {

  switch (action.type) {

  case 'SETCOMMENT':
    return  state=action.comment
  default: 
    return state
  }
}

export default reducer