describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#submit-button').click()
    })

    it('fails with incorrect credentials', function() {
      cy.contains('logout').click()
      cy.contains('Login').click()
      cy.get('#username').type('wrong')
      cy.get('#password').type('credentials')
      cy.get('#submit-button').click()
      cy.contains('Username or password incorrect')
    })

  })

})