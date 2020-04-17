
import React from 'react'
import { useSelector } from 'react-redux'
import {Alert} from 'react-bootstrap'

const Message = ()  => {


  const notification =  useSelector(state => state.notification)

	let variant ='success'
	
	if(notification.includes("failed")) {
		variant ='warning'
	}

	
  if (notification === '') {
    return ''
  }
  
  return (

	<Alert variant={variant}> {notification}</Alert>
  )
    
    
}

Message.displayName='Message'

export default Message;