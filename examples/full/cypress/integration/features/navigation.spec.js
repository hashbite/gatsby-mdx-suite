/// <reference types="cypress" />

describe('navigation', () => {
  it('menu is working', () => {
    cy.visit('/')

    cy.get('a').contains('Blog').click()

    cy.get('main section').should('contains.text', 'Blog')

    cy.location().should((loc) => {
      expect(loc.pathname).to.contains('/blog')
    })

    cy.get('a').contains('Layouts').click()

    cy.get('main section').should('contains.text', 'Default section')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/layouts/')
    })

    cy.get('a').contains('Animations').click()

    cy.get('main section').should('contains.text', 'Animation Support')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/animations/')
    })

    cy.get('a').contains('Videos').click()

    cy.get('main section').should('contains.text', 'Video Support')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/video-support/')
    })

    cy.get('a').contains('Scroll effects').click()

    cy.get('main section').should('contains.text', 'Scroll effects')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/scroll-effects/')
    })

    cy.get('a').contains('Home').click()

    cy.get('main section').should('contains.text', 'Gatsby MDX Suite')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })

    cy.get('a').contains('Docs').click()

    cy.get('main').should('contains.text', 'Docs - Welcome')

    cy.location().should((loc) => {
      expect(loc.pathname).to.contain('/docs')
    })
  })
})
