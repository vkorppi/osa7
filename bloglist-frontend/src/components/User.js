import React, {  useEffect } from 'react'

import { getAllUsers } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from "react-router-dom"

const User = ({user,account}) => {



  if (!user) {
    console.log(user)
    return null 
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h1>{"User's blogs"}</h1>
   
      {user.blogs.map(blog =>
        <div key={blog.id}>
          <div>{blog.title} </div>
        </div>
      )}

    </div>
  
  )
  
}

export default User