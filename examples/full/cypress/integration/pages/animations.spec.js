/// <reference types="cypress" />

describe('animations', () => {
  beforeEach(() => {
    cy.visit('/animations')
  })

  it('renders page components', () => {
    cy.get('h1').should('contains.text', 'Animation Support')
    cy.get('h2').contains('which trigger on scroll').should('not.be.visible')

    cy.get('h2')
      .contains('which trigger on scroll')
      .parents('section')
      .scrollIntoView({ duration: 1000 })

    cy.get('h2').contains('which trigger on scroll').should('be.visible')

    cy.scrollTo('bottom', { duration: 2000, easing: 'linear' })

    // Sections
    cy.get('section').should('have.length', 4)

    // images
    cy.get('main img').should('have.length', 2)

    // Videos
    cy.get('main video').should('have.length', 2)
  })
})
