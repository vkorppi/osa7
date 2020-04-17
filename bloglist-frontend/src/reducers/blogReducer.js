
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'
import {addUserBlog} from '../reducers/userReducer'
const _ = require('lodash');


export const addBlog = (user,newblog) => {

  return async dispatch => { 

    try {

 
      
      const token = newblog.token
      delete newblog.token; 

      var createdblog = await blogService.createNew(newblog,token)

      // Dirty fix to a bug
      createdblog.username=token.username

      dispatch(addUserBlog(user,createdblog))
  
      dispatch(setNotification(`Blog creation successfull`))
    
      dispatch({ createdblog: createdblog,type: 'ADDBLOG'})
        
    }
    catch (exception) {
      console.log(exception)
      dispatch(setNotification(`Blog creation failed`))
  
    }
      
  }
}


export const removeBlog = (blogrm) => {

  return async dispatch => { 

    const token = blogrm.token
    delete blogrm.token; 

    await blogService.remove(blogrm.id,token)

    dispatch({ id: blogrm.id,type: 'REMOVEBLOG'})
        
  }
}




export const getAllBlogs = () => {

  return async dispatch => { 
        
    const bloglist= await blogService.getAll()


    dispatch({ bloglist: bloglist,type: 'ALLBLOGS'})    
  }
}

export const increaseLikes = (blog) => {

  return async dispatch => { 
    
    const updateblog = {
      "title": blog.title,
      "author": blog.author,
      "url": blog.url,
      "likes": (blog.likes+1),
      "user": blog.user,
      "comments":blog.comments,
      "id": blog.id
    }


    const updatedBlog= await blogService.update(updateblog)

    // dirty fix
    updatedBlog.username=blog.username
    updatedBlog.user = blog.user
    
    updatedBlog.comments=blog.comments
    
    dispatch({ updatedBlog: updatedBlog,type: 'INCREASELIKES'})   

  }
}

export const addComment = (blog,comment) => {

  return async dispatch => { 


    const blogWithcomment= await blogService.addComment(blog.id,{"comment": comment})

    // dirty fix
    blogWithcomment.username=blog.username
    blogWithcomment.user = blog.user

    blogWithcomment.comments=blog.comments.concat({"comment": comment})
    dispatch({ blogWithcomment: blogWithcomment,type: 'COMMENTADDED'})   

  }
}


const reducer = (state = [], action) => {

  switch (action.type) {
  
  case 'ADDBLOG':
    return  state= _.orderBy(state.concat(action.createdblog), ['likes'], [ 'desc'])
  case 'REMOVEBLOG':

    var updatedlist = _.remove(state, function(blog) {
      return blog.id !== action.id;      
    });
    return state=_.orderBy(updatedlist, ['likes'], [ 'desc'])

  case 'ALLBLOGS':    
    return  state= _.orderBy(action.bloglist, ['likes'], [ 'desc']) 
  case 'INCREASELIKES':

    var updatedlistLikes = _.remove(state, function(blog) {
      return blog.id !== action.updatedBlog.id;
    });
      
    return  state= _.orderBy(updatedlistLikes.concat(action.updatedBlog), ['likes'], [ 'desc'])

  case 'COMMENTADDED':

    var updatedCommentList = _.remove(state, function(blog) {
      return blog.id !== action.blogWithcomment.id;
    });
        
    return  state= _.orderBy(updatedCommentList.concat(action.blogWithcomment), ['likes'], [ 'desc'])
      
  default: 
    return state
  }
}

export default reducer