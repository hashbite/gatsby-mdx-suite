/// <reference types="cypress" />

describe('videos', () => {
  beforeEach(() => {
    cy.visit('/video-support')
  })

  it('renders page components', () => {
    cy.get('h1').should('contains.text', 'Video Support')

    cy.get('h2')
      .contains('As content element via <Video/>:')
      .scrollIntoView({ duration: 1000 })

    cy.scrollTo('bottom', { duration: 2000, easing: 'linear' })

    // Images
    cy.get('main img').should('have.length', 0)
    cy.get('main svg').should('have.length', 13)

    // Videos
    cy.get('main video').should('have.length', 1)

    // Externals should be hidden via consent manager
    cy.get('main').should('contains.text', 'Youtube via <YoutubeVideo/>')
    cy.get('main').should(
      'contains.text',
      'This feature contains content by YouTube'
    )
    cy.get('main').should('contains.text', 'Vimeo via <VimeoVideo/>')
    cy.get('main').should(
      'contains.text',
      'This feature contains content by Vimeo'
    )
  })
})
