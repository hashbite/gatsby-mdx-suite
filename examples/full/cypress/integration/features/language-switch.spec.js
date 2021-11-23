describe('language switch', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('shows english by default', () => {
    cy.get('a[aria-label="Switch language to en-US"]').should('not.be.visible')
    cy.get('a[aria-label="Switch language to de"]').should('be.visible')
  })

  it('language switching', () => {
    cy.visit('/')

    cy.get('a[aria-label="Switch language to de"]:visible').click()

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/de/')
    })
    cy.get('a[aria-label="Switch language to en-US"]').should('be.visible')
    cy.get('a[aria-label="Switch language to de"]').should('not.be.visible')

    cy.get('a[aria-label="Switch language to en-US"]:visible').click()

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
    cy.get('a[aria-label="Switch language to en-US"]').should('not.be.visible')
    cy.get('a[aria-label="Switch language to de"]').should('be.visible')
  })
})
