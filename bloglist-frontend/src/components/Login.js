
import React from 'react'
import {setUsername} from '../reducers/usernameReducer'
import {setPassword} from '../reducers/passwordReducer'
import {sendCreds} from '../reducers/accountReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'


const LoginForm   = () => {

  const dispatch = useDispatch()
  const username = useSelector(state =>state.username)
  const password = useSelector(state =>state.password)
  const account = useSelector(state =>state.account)

  const usernameHandler =   (event) => {
    console.log(event.target.value)
    dispatch(setUsername(event.target.value))
  }

  const passwordHandler =  (event) => {
    console.log(event.target.value)
    dispatch(setPassword(event.target.value))
  }

  const submitHandler = async  (event) => {

    event.preventDefault()
    dispatch(sendCreds(username,password))

  }
  

    
  return (
  
    <>
      <form  onSubmit={submitHandler}>
        <Form.Group>
          
          <Form.Label>Username:</Form.Label>           
          <Form.Control type="text" id="username" value={username}  onChange={usernameHandler} />
         
          <Form.Label>Password:</Form.Label>
          <Form.Control  type="password" id="password" value={password} onChange={passwordHandler} />
        
          <Button variant="primary" id="login" type="submit"> login</Button>
        
        </Form.Group>
      </form>
    </>
  )
}




export default LoginForm;