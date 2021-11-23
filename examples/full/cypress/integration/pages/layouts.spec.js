/// <reference types="cypress" />

describe('layouts', () => {
  beforeEach(() => {
    cy.visit('/layouts')
  })

  it('renders page components', () => {
    // @todo no header

    cy.scrollTo('bottom', { duration: 2000, easing: 'linear' })

    // Sections
    cy.get('section').should('have.length', 9)

    // Images
    // cy.get('main img').should('have.length', 34)
    // Videos
    cy.get('main video').should('have.length', 1)
  })
})
