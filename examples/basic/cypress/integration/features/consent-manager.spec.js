const INTRO_TEXT = 'Data protection enabled'

describe('Consent Manager', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(1000)
  })

  it('shows intro after 4 seconds', () => {
    cy.wait(4000)
    cy.get('body').should('contain', INTRO_TEXT)
  })

  it('test YouTube integration', () => {
    // Enable youtube
    cy.get('iframe').should('have.length', 0)
    cy.get('h2 + section')
      .should('contain.text', 'Recommended external content')
      .should('contain.text', 'This feature contains content by YouTube')
      .find('button')
      .contains('Enable Videos by YouTube')
      .click()
    cy.get('iframe').should(($iframe) => {
      expect($iframe).to.have.length(1)

      const src = $iframe[0].src

      expect(src).to.match(/^https:\/\/www.youtube.com\/embed\//)
    })
  })
})
