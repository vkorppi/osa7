
import React from 'react'
import {Link} from "react-router-dom"
import { Table } from 'react-bootstrap'
import {useHistory} from "react-router-dom"

const Users = ({users,account}) => {
	
	const history = useHistory()
	
	   if(!account) {

    history.push('/')
	return null
  }

  return (
    <>
      <h2>users</h2>
      <div  >
        <Table striped>    
          <tbody>
            <tr>
              <th>Users</th>
              <th>Number of blogs</th> 
            </tr>
            {users.map(user =>
              <tr key={user.id}>
                <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>

  )

}

export default Users