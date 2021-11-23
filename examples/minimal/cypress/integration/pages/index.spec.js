/// <reference types="cypress" />

describe('home test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders example mdx', () => {
    cy.get('h1').should('have.text', 'The very first headline')
    cy.get('[data-cypress=custom-component]')
      .should('have.text', 'Content within custom component.')
      .should('have.css', 'background-color', 'rgb(229, 62, 62)')
      .should('have.css', 'color', 'rgb(26, 32, 44)')
  })
})
