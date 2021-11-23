// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('isNotInViewport', { prevSubject: true }, (element) => {
  const message = `Did not expect to find ${element[0].outerHTML} in viewport`

  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state('window')).height()
    const rect = $el[0].getBoundingClientRect()

    expect(rect.top).to.be.greaterThan(bottom, message)
    expect(rect.bottom).to.be.greaterThan(bottom, message)
    expect(rect.top).to.be.greaterThan(bottom, message)
    expect(rect.bottom).to.be.greaterThan(bottom, message)
  })
})

Cypress.Commands.add('isInViewport', { prevSubject: true }, (element) => {
  const message = `Expected to find ${element[0].outerHTML} in viewport`

  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state('window')).height()
    const rect = $el[0].getBoundingClientRect()

    expect(rect.top).not.to.be.greaterThan(bottom, message)
    expect(rect.bottom).not.to.be.greaterThan(bottom, message)
    expect(rect.top).not.to.be.greaterThan(bottom, message)
    expect(rect.bottom).not.to.be.greaterThan(bottom, message)
  })
})
