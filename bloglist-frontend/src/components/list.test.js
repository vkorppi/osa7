
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'
import NewBlogForm from './NewBlog'

const account = {
  "username":"useranmeTest",
  "password":"passwordTest"
}



const blog2 = {
  "title": "titleTest",
  "author": "authorTest",
  "url": "urlTest",
  "likes": 10,
  "id":"idBlogTest",
  "user":  {
    "username":"useranmeTest",
    "password":"passwordTest",
    "name":"nameTest",
    "id":"idUserTest"
  
  }
}

const test1 =  () => {}
const test2 =  () => {}


describe('visiblity tests', () => {

  let component

  beforeEach(() => {

    component = render(
      <Blog blog={blog2} increaseLikes={test1} account={account} removeBlog={test2}/>
    )

  })

  test('Url and likes not visible', () => {



    const divIsItHidden = component.container.querySelector('.visibility')

    expect(divIsItHidden).toHaveStyle('display: none')


  })


  test('Url and likes are visible', () => {

    const showmore = component.getByText('Show more')
    fireEvent.click(showmore)

    const divIsItHidden = component.container.querySelector('.visibility')

    expect(divIsItHidden).not.toHaveStyle('display: none')
  })

})


describe('button tests', () => {


  test('event button pressed twice', () => {

    const liketestevent = jest.fn()

    const component = render(
      <Blog blog={blog2} increaseLikes={liketestevent} account={account} removeBlog={test2}/>
    )

    const likesbutton = component.getByText('Like')
    fireEvent.click(likesbutton)
    fireEvent.click(likesbutton)
  

    expect(liketestevent.mock.calls).toHaveLength(2)


  })

})

describe('form tests', () => {


  test('Blog form test', () => {

    const newblogtestevent = jest.fn()

    const component = render(
      <NewBlogForm createNewBlog={ newblogtestevent }/>
    )

    const newblogform =  component.container.querySelector('form')
    const blogauthor  =  component.container.querySelector('#author')
    const blogtitle   =  component.container.querySelector('#title')
    const blogurl     =  component.container.querySelector('#url')

    fireEvent.change(blogauthor, { 
      target: { value: 'BlogAuthorTest1' } 
    })

    fireEvent.change(blogtitle, { 
      target: { value: 'BlogTitleTest1' } 
    })

    fireEvent.change(blogurl, { 
      target: { value: 'BlogUrlTest1' } 
    })


    fireEvent.submit(newblogform)


    expect(newblogtestevent.mock.calls[0][0].title).toBe('BlogTitleTest1')
    expect(newblogtestevent.mock.calls[0][0].author).toBe('BlogAuthorTest1')
    expect(newblogtestevent.mock.calls[0][0].url).toBe('BlogUrlTest1')

  })

})