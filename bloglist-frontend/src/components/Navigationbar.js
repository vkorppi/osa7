import React from 'react'
import {Link} from "react-router-dom"
import {  Navbar, Nav } from 'react-bootstrap'

const Navigationbar = () => {
  const margin = {
    "font-size":40,
    margin:10
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">
            <Link style={margin} to="/">All blogs</Link>
	        </Nav.Link>
          <Nav.Link href="#">
            <Link style={margin} to="/users">All users</Link>
	        </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigationbar
  