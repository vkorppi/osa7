import React from 'react'
import PropTypes from 'prop-types'
//import ChangeVisibility from './ChangeVisibility'
import {  useDispatch,useSelector } from 'react-redux'
import {increaseLikes,removeBlog,addComment} from '../reducers/blogReducer'
import {setComment} from '../reducers/inputcomReducer'
import {removeUserBlog} from '../reducers/userReducer'
import {useHistory} from "react-router-dom"
import { Table,Form, Button  } from 'react-bootstrap'
const _ = require('lodash');


const Blog = ({ blog,account}) => {

 

  // dirty fix
  let username = blog.user.username
  
  const history = useHistory()
  const comment =  useSelector(state => state.comment)
  const users =  useSelector(state => state.user)
  


  if(!username)  {
    username = blog.username
   
  }

  const dispatch = useDispatch()
  
   if(!account) {

    history.push('/')
	return null
  }
  
  const likesHandler =  () => {

    dispatch(increaseLikes(blog))
   
  }

  const commentHandler = async  (event) => {
    console.log(event.target.value)
    dispatch(setComment(event.target.value))
  }

  const removeHandler =  () => {

    if(window.confirm('Are you sure you want to remove this blog')) {
      blog.token = account
      dispatch(removeBlog(blog))

      const user =_.find(users, function(user) { return user.username === username; });

      

      dispatch(removeUserBlog(user,blog.id))


      history.push('/')
    }
  }

  const newCommentHandler = async  (event) => {
    event.preventDefault()
  
    dispatch(addComment(blog,comment))
    dispatch(setComment(''))
  }

  return (
    <div className="blogs">

      <div>
        <h2> {blog.title}</h2> {/*  {blog.author} */}
      </div>

      <div>
        {blog.author} 
      </div>

      {/*   <ChangeVisibility ref={React.createRef()}>  */}
      <div>
        {blog.url}  
      </div>
      <div>
        <span className="numberoflikes"> {blog.likes}</span> <Button variant="secondary" className="likebuttons" onClick={likesHandler}>Like</Button>
      </div>
 
      <div>
        <Button variant="secondary" className="removeblogs" style={{display:  account.username === username ? '' : 'none' }} onClick={removeHandler} >Remove</Button>
      </div>
      <div>
        {`Creator is ${account.name}`}
      </div>
      <div>
        <h1> Comment section</h1>
      </div>
      <div>      
        <form  onSubmit={newCommentHandler}>
		<Form.Group>
          
		  <Form.Control type="text" id="comment" value={comment}  onChange={commentHandler} />
		  <Button variant="primary"  type="submit"> Send comment</Button>
		  
		  </Form.Group>
        </form>
      </div>
      <br/>

      <Table striped>    
        <tbody>
          {blog.comments.map(comment =>
            <tr key={comment.id}>
              <td>
                {comment.comment}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

 
 
      {/*  </ChangeVisibility> */}

    </div>
  )
}

Blog.propTypes = {
  account: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
