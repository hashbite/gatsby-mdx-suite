/// <reference types="cypress" />

describe('home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders page components', () => {
    cy.get('h1').should('contains.text', 'Gatsby MDX Suite')

    cy.scrollTo('bottom', { duration: 2000, easing: 'linear' })

    // images
    cy.get('main img').should('have.length', 6)

    // Videos
    cy.get('main video').should('have.length', 1)
  })
})
