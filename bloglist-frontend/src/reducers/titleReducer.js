

export const setTitle = (title) => {

  return async dispatch => { 

    await dispatch({ title: title,type: 'SETTITLE'})
  
  }
}
  
const reducer = (state = '', action) => {

  switch (action.type) {

  case 'SETTITLE':
    return  state=action.title
  default: 
    return state
  }
}

export default reducer