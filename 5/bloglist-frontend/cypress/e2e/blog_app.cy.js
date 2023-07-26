describe('Blog app', function () {
  it('loginform shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })
  it('login fails with wrong password', function () {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('omena')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('Error: Login info incorrect')
  })
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'omena',
      username: 'omena',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
    //login näkyy
    cy.contains('login').click()
    //kirjautuminen onnistuu
    cy.get('#username').type('omena')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()
  })
  it('create blog', function () {
    cy.get('#toggle').click()
    cy.get('#title').type('testi')
    cy.get('#author').type('testi2')
    cy.get('#url').type('testi3')
    cy.get('#create').click()
  })
  it('like blog and delete', function () {
    cy.get('#toggle').click()
    cy.get('#title').type('testi')
    cy.get('#author').type('testi2')
    cy.get('#url').type('testi3')
    cy.get('#create').click()
    cy.get('#view').click()
    cy.get('#like').click()
    cy.contains('1')
    cy.get('#removal').click()
    cy.contains(/has been removed/)
  })
  it('only the author of the blog can delete it', function () {
    cy.get('#toggle').click()
    cy.get('#title').type('testi')
    cy.get('#author').type('testi2')
    cy.get('#url').type('testi3')
    cy.get('#create').click()
    cy.get('#view').click()
    cy.get('#omena').should('contain', 'omena')
  })

  it('blogs are like-ordered', function () {
    cy.get('#toggle').click()
    cy.get('#title').type('testi')
    cy.get('#author').type('testi2')
    cy.get('#url').type('testi3')
    cy.get('#create').click()
    cy.get('#title').type('toinen')
    cy.get('#author').type('toinen2')
    cy.get('#url').type('toinen3')
    cy.get('#create').click()
    cy.get('div>div>div>div>div>div>button').eq(1).click()
    cy.get('#like').click()
    cy.visit('http://localhost:3000')
    cy.get('div>div>div>div>div>div>button').eq(1).click()
    cy.get('#like').click().click()
    cy.visit('http://localhost:3000')
    cy.get('div>div>div>div>div>button').parent().eq(0).should('contain', 'testi2')
  })
})