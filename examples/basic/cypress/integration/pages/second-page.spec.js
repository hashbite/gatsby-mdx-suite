/// <reference types="cypress" />

describe('second-page test', () => {
  beforeEach(() => {
    cy.visit('/second-page')
  })

  it('renders page components', () => {
    cy.get('main').should(
      'contains.text',
      'An introduction to the <Section /> component.'
    )

    cy.scrollTo('bottom', { duration: 2000, easing: 'linear' })

    // 3 background videos
    cy.get('main video[playsinline][autoplay][loop]').should('have.length', 3)
  })
})
