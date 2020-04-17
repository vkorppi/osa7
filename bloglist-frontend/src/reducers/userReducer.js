import userService from '../services/users'
const _ = require('lodash');


export const getAllUsers = () => {

  return async dispatch => { 
          
    const userlist= await userService.getAll()
  
  
    dispatch({ userlist: userlist,type: 'ALLUSERS'})    
  }
}

export const removeUserBlog = (user,blogid) => {

  return async dispatch => { 
          
    user.blogs=_.remove(user.blogs, function(blog) {
      return blog.id !== blogid;
    });
  
    console.log(user.blogs)

    dispatch({ user: user,type: 'REMOVEUSERBLOG'})    
  }
}

export const addUserBlog = (user,blog) => {

  return async dispatch => { 

    const blogid = blog.id

    user.blogs=_.remove(user.blogs, function(blog) {
      return blog.id !== blogid;
    });

    user.blogs = user.blogs.concat(blog)

    dispatch({ user: user,type: 'ADDUSERBLOG'}) 

  }

}


const reducer = (state = [], action) => {

  switch (action.type) {
  case 'ALLUSERS':    
    return  state= action.userlist
  case 'REMOVEUSERBLOG':    
    return  state= (_.remove(state, function(user) {
      return user.id !== action.user.id;
    })).concat(action.user)
  case 'ADDUSERBLOG': 
    return  state= (_.remove(state, function(user) {
      return user.id !== action.user.id;
    })).concat(action.user)
  default: 
    return state
  }
}

export default reducer