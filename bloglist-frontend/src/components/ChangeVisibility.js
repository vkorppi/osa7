/* eslint-disable react/prop-types */


import React, { useState, useImperativeHandle  } from 'react'
import { Button  } from 'react-bootstrap'

const ChangeVisibility = React.forwardRef((props, ref)  => {

  const [visible, setVisible] = useState('none')
  const [buttonText, setButtonText] = useState('Show more')
  

  const labelMore='Show more'
  const labelLess='Show less'
  
  const visibilityHandler = () => {

    visible === '' ? setVisible('none') : setVisible('')
    buttonText === labelMore ? setButtonText(labelLess) : setButtonText(labelMore)

  }
	
  useImperativeHandle(ref, () => {

    return { visibilityHandler  }    
  })
  
  return (
    <div>
      <div style={{display: visible }} className="visibility">
        {props.children}       
      </div>
    
	  <Button variant="secondary" className="showhide" onClick={visibilityHandler}>{buttonText}</Button>
    </div>
  )
})

ChangeVisibility.displayName='ChangeVisibility'

export default ChangeVisibility;