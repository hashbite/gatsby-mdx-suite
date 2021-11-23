/// <reference types="cypress" />

describe('scroll-effects', () => {
  beforeEach(() => {
    cy.visit('/scroll-effects')
  })

  it('renders page components', () => {
    cy.get('main h1').should('contains.text', 'Scroll effects')

    cy.get('main p').contains('THE VOID').isNotInViewport()

    cy.wait(1000)

    cy.get('main button').contains('Beam me down, Scotty!').click()

    cy.wait(1000)

    cy.get('main p').contains('THE VOID').isInViewport()

    cy.get('main a').contains('go back to the beginning?').click()

    cy.wait(1000)

    cy.get('main p').contains('THE VOID').isNotInViewport()

    cy.get('main section').should('have.length', 8)
  })
})
