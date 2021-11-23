/// <reference types="cypress" />

describe('home test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders page components', () => {
    cy.get('h1').should(
      'contains.text',
      'Welcome to the basic demo of Gatsby MDX Suite'
    )

    cy.scrollTo('bottom', { duration: 2000, easing: 'linear' })

    // Two images
    cy.get('main img').should('have.length', 4)

    // One rendered video
    cy.get('main video').should('have.length', 1)
    // With 3 codecs
    cy.get('main video source').should('have.length', 3)
  })
})
