describe('Docs', () => {
  beforeEach(() => {
    cy.visit('/docs')
  })

  it('successfully loads', () => {
    cy.get('main').should('contain', 'Docs - Welcome')
  })

  it('playground works', () => {
    cy.get('main').contains('Playground').click()
    cy.get('.monaco-editor', { timeout: 10000 }).should('exist')

    cy.get('select').contains('Open sidebar').parent().select('Media')
    cy.get('main section h1').should('contain', 'Media')
  })

  it('component listing works', () => {
    cy.get('main').contains('Components').click()
    cy.get('main').should('contain', 'Please pick a component from the menu')

    // Detail page
    cy.get('main nav').contains('Link').click()
    cy.get('main').should('contain', '<Link />')
    cy.location().should((loc) => {
      expect(loc.pathname).to.contain('/mdx-link/')
    })
  })
})
