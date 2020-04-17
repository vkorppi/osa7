import React, {  useEffect } from 'react'
import Allblogs from './components/List'
import LoginForm from './components/Login'
import NewBlogForm from './components/NewBlog'
import Message from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navigationbar from './components/Navigationbar'
import ChangeVisibility from './components/ChangeVisibility'
import { getAllBlogs } from './reducers/blogReducer'
import { setAccount } from './reducers/accountReducer'
import { getAllUsers } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import {Switch, Route,Redirect,useRouteMatch} from "react-router-dom"
import { Button  } from 'react-bootstrap'
import './App.css'



const App = () => {

 
  const account = useSelector(state =>state.account)

  const dispatch = useDispatch()
  const blogs = useSelector(state =>state.blog)
  const users = useSelector(state =>state.user)
  
  const formref = React.createRef()

  const endSession = () => {
    
    window.localStorage.removeItem('UserWithSession')
    dispatch(setAccount(null))
  }




  useEffect(() => {

    dispatch(getAllBlogs())
    dispatch(getAllUsers())
    console.log('rendered')
  }, [dispatch])

  useEffect(() => {   

    const accountJson = window.localStorage.getItem('UserWithSession')  
    accountJson ?  dispatch(setAccount(JSON.parse(accountJson))) : console.log('No previous session found')
  } 
  ,
  [])

  const matchRoute = useRouteMatch("/users/:id")
  let user  

  if(matchRoute) {

    user= users.find(user => user.id === matchRoute.params.id)

  }
  else {

    user=null
  }

  const matchRoute2 = useRouteMatch("/blogs/:id")
  let blog  

  if(matchRoute2) {

    blog= blogs.find(blog => blog.id === matchRoute2.params.id)

  }
  else {

    blog=null
  }
  
  

  return (

    <div className="container">
    
      {account ?
        <>
        <Navigationbar />
          <h2>blogs</h2>
          <div>User name: {account.name}</div>
          <div> <Button variant="secondary" onClick={endSession}>logout</Button></div>
          <br></br>
        </>
        : null}

      
      <Switch>
        <Route path="/users/:id">
          <>  <User user={user} />  </> 
        </Route>
	        <Route path="/users">
          <>  <Users users={users} account={account} />  </> 
        </Route>
        <Route path="/blogs/:id">
          <> <Blog  blog={blog} account={account} />   </> 
        </Route>	  
        <Route path="/login">
          {!account ?   <> <Message /> <LoginForm  />  </> :  <Redirect to="/" />}  
        </Route>
        <Route path="/">
          {account ? 
            <>
              <Message />
              <ChangeVisibility ref={formref}>
                <NewBlogForm visibilityselector={formref} />
              </ChangeVisibility>
              <Allblogs content={blogs} account={account} />
            </>
            :  <Redirect to="/login" />}  
        </Route> 
      </Switch>
  
    
    </div>

  )

 

}

export default App