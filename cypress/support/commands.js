Cypress.Commands.add("login", () => {
  cy.visit('https://learn.staging.concord.org/auth/login')
  cy.get('#username').type('GGrey');
  cy.get('#password').type('GGrey1');
  cy.get('#submit').click();
})
