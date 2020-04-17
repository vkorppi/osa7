
import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {setAccount} from '../reducers/accountReducer'
import {Link} from "react-router-dom"
import { Table } from 'react-bootstrap'

const Allblogs   = ({content,account}) => {

  //const dispatch = useDispatch()

  return (
    <div  id="list">
      <Table striped>    
        <tbody>
          {content.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> 
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

Allblogs.propTypes = {
  content: PropTypes.array.isRequired,
  account: PropTypes.object.isRequired,
}


export default Allblogs;