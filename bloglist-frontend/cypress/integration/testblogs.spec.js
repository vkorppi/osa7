describe('Blog app', function() {

  
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const account = { 
      "username": "testusername",
      "password": "passwordTest" ,
      "name": "testuser "  
    }

    cy.request('POST', 'http://localhost:3001/api/users/', account) 


    cy.visit('http://localhost:3000')
  })
  
  it('Login from is shown', function() {

    cy.contains('Username')
    cy.contains('Password')
    cy.get('#login').contains('login')
  })

  describe('test related to login to app',function() {

    it('Login to app succeeded', function() {
  
      cy.get('#username').type('testusername')
      cy.get('#password').type('passwordTest')
      cy.get('#login').click()

      cy.contains('User name: testuser')
  
    })
  
    it('Login to app failed', function() {
  
      cy.get('#username').type('badusername')
      cy.get('#password').type('badpassword')
      cy.get('#login').click()

      cy.contains('Username')
      cy.contains('Password')
      cy.get('#login').contains('login')

  
    })
  
  })

})

describe('test related to logged in user',function() {


  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
  
    const account = { 
      "username": "testusername",
      "password": "passwordTest" ,
      "name": "testuser "  
    }
  
    cy.request('POST', 'http://localhost:3001/api/users/', account) 
  
  
    // Tarkista viela
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'testusername',
      password: 'passwordTest'  
    })
      .then(response => {  
        localStorage.setItem('UserWithSession', JSON.stringify(response.body))    
        cy.visit('http://localhost:3000')    
      }) 
  })


  

  it('Can create blog', function() {

    const newblog = {
      "title": "title4",
      "author": "author4",
      "url": "https://greenlivingguy.com/2020/02/mitch-evans-panasonic-team-wins-formula-e-in-mexico-city/",
      "likes": 2
    }

    // Tarkista viela
    const newblogRequest = {
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: newblog,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('UserWithSession')).userToken}`
      }

    }

    cy.request(newblogRequest).then(response => {  
      
      cy.visit('http://localhost:3000')    
    }) 


    cy.contains('title4 author4')

  })

 

  it('Can give likes to blog', function() {

    const newblog = {
      "title": "title4",
      "author": "author4",
      "url": "https://greenlivingguy.com/2020/02/mitch-evans-panasonic-team-wins-formula-e-in-mexico-city/",
      "likes": 0
    }

    // Tarkista viela
    const newblogRequest = {
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: newblog,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('UserWithSession')).userToken}`
      }

    }

    cy.request(newblogRequest).then(response => {  
      
      cy.visit('http://localhost:3000')    
    }) 

    cy.get('.blogs .showhide').click()

    cy.get('.likebuttons').click()

    cy.get('.blogs .showhide').click()

    cy.get('.numberoflikes').contains(1)
  })


      
  it('Can remove own blog', function() {

    // Tarkista lohko vielä
    
    const newblog = {
      "title": "title2",
      "author": "author2",
      "url": "https://greenlivingguy.com/2020/02/mitch-evans-panasonic-team-wins-formula-e-in-mexico-city/",
      likes: 0
    }

    // Tarkista viela
    const newblogRequest = {
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: newblog,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('UserWithSession')).userToken}`
      }    
    }
  
    cy.request(newblogRequest).then(response => {  
      
      cy.visit('http://localhost:3000')    
    }) 
    
 
    cy.get('.blogs .showhide').click()
      
    cy.get('.removeblogs').click()

    cy.get('#list').should('not.contain', 'title2 author2')

  })

  it('Order of blogs is correct', function() {

    const newblog = {
      "title": "title4",
      "author": "author4",
      "url": "https://greenlivingguy.com/2020/02/mitch-evans-panasonic-team-wins-formula-e-in-mexico-city/",
      "likes": 10
    }

    const newblog2 = {
      "title": "title5",
      "author": "author5",
      "url": "https://greenlivingguy.com/2020/02/mitch-evans-panasonic-team-wins-formula-e-in-mexico-city/",
      "likes": 1
    }

    const newblog3 = {
      "title": "title6",
      "author": "author6",
      "url": "https://greenlivingguy.com/2020/02/mitch-evans-panasonic-team-wins-formula-e-in-mexico-city/",
      "likes": 20
    }

    const newblogRequest = {
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: newblog,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('UserWithSession')).userToken}`
      }

    }

    const newblogRequest2 = {
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: newblog2,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('UserWithSession')).userToken}`
      }

    }

    const newblogRequest3 = {
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: newblog3,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('UserWithSession')).userToken}`
      }

    }

    cy.request(newblogRequest).then(response => {  
      
      cy.visit('http://localhost:3000')    
    }) 
    cy.request(newblogRequest2).then(response => {  
      
      cy.visit('http://localhost:3000')    
    }) 

    cy.request(newblogRequest3).then(response => {  
      
      cy.visit('http://localhost:3000')    
    }) 


    cy.get('.numberoflikes').then( blogs => {

      
      cy.wrap(blogs[0]).contains("20")
      cy.wrap(blogs[1]).contains("10")
      cy.wrap(blogs[2]).contains("1")
      
    })

  })

})



