Cypress.Commands.add("login", (username,password) => {
  cy.visit('https://learn.staging.concord.org/auth/login')
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#submit').click();
})
