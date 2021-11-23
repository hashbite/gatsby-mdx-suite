/// <reference types="cypress" />

describe('blog', () => {
  beforeEach(() => {
    cy.visit('/blog')
  })

  it('renders blog', () => {
    cy.get('h1').should('contains.text', 'Blog')
    cy.get('main a:contains(Read more)').should('have.length', 3)
  })
})
