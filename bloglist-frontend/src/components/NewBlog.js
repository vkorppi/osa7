
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {setTitle} from '../reducers/titleReducer'
import {setAuthor} from '../reducers/authorReducer'
import {setUrl} from '../reducers/urlReducer'
import {addBlog} from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

// siirrä
import {addUserBlog} from '../reducers/userReducer'
const _ = require('lodash');

// eslint-disable-next-line react/prop-types
const NewBlogForm   = ({visibilityselector}) => {


  const dispatch = useDispatch()
  const title = useSelector(state =>state.title)
  const author = useSelector(state =>state.author)
  const url = useSelector(state =>state.url)
  const account =  useSelector(state => state.account)
  const users =  useSelector(state => state.user)

  

  const titleHandler = async  (event) => {
    console.log(event.target.value)
    dispatch(setTitle(event.target.value))
  }
    
  const authorHandler = async  (event) => {
    console.log(event.target.value)
    dispatch(setAuthor(event.target.value))
  }
    
  const urlHandler = async  (event) => {
    console.log(event.target.value)
    dispatch(setUrl(event.target.value))
  }

  const newBlogHandler = async  (event) => {
    event.preventDefault()

    const user =_.find(users, function(user) { return user.username === account.username; });
   
    const newblog = {"title":title,"author":author,"url":url,"token":account}
    dispatch(addBlog(user,newblog))

    //dispatch(addUserBlog(user,newblog))

    dispatch(setTitle(''))
    dispatch(setAuthor(''))
    dispatch(setUrl(''))
  
    // eslint-disable-next-line react/prop-types
    visibilityselector.current.visibilityHandler()
  }
    
  return (
  
    <>
      <form  onSubmit={newBlogHandler}>
                
      <Form.Group>
          
          <Form.Label>Title:</Form.Label>           
          <Form.Control type="text" id="title" value={title}  onChange={titleHandler} />
		  
          <Form.Label>Author:</Form.Label>
          <Form.Control  type="text" id="author" value={author} onChange={authorHandler} />
		  
		  <Form.Label>Url:</Form.Label>		   
		  <Form.Control  type="text" id="url" value={url} onChange={urlHandler} />
	
          <Button variant="primary" id="create" type="submit"> create</Button>
        
        </Form.Group>

      </form>
    </>
  )
}


NewBlogForm.propTypes = {
  visibilityselector: PropTypes.object.isRequired,
}




export default NewBlogForm;