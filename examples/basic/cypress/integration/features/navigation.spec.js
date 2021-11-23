/// <reference types="cypress" />

describe('navigation', () => {
  it('menu is working', () => {
    cy.visit('/')

    cy.get('a').contains('Second Page').click()

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/second-page/')
    })

    cy.get('main section').should(
      'contains.text',
      'An introduction to the <Section /> component.'
    )

    cy.get('a').contains('Home').click()

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })

    cy.get('h1').should(
      'contains.text',
      'Welcome to the basic demo of Gatsby MDX Suite'
    )
  })
})
