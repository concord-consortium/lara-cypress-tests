Cypress.Commands.add("login", (username, password) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password, { log: false });
  cy.get("#submit").click( {force: true} );
  cy.wait(500)
});

Cypress.Commands.add("loginLARAWithSSO", (username, password) => {
  cy.log("Logging in as user : " + username);
  cy.get("[data-cy=header-menu] .login-link").click();
  cy.wait(1000);
  cy.get("[data-cy=header-menu] .header-menu-links.show a").eq(0).click();
  cy.wait(2000);
  cy.login(username, password);
})

Cypress.Commands.add("loginLARA", (username) => {
  cy.log("Logging in as user : " + username);
  cy.get("[data-cy=header-menu] .login-link").click();
  cy.wait(1000);
  cy.get("[data-cy=header-menu] .header-menu-links.show a").eq(0).click();
  cy.wait(2000);
})

Cypress.Commands.add("launchActivty", () => {
  cy.log("Launch Test Activity : ");
  cy.get("#search input").eq(0).type("Automation");
  cy.get("#search input").eq(1).click();
  cy.wait(500);
  cy.get("#item_lightweight_activity_31 .action_menu_header_right .edit a").click();
  cy.wait(500);
  cy.get('#rightcol #pages [id^=item_interactive_page] .edit').click();
  cy.wait(2000);
})

Cypress.Commands.add("deleteItem", () => {
  cy.get("body").then($body => {
        if ($body.find(".itemsContainer .sectionItemContainer").length > 0) {
          cy.log("Delete Item");
          cy.get('.itemsContainer .sectionItemContainer .menuEnd button').eq(4).click();
          cy.wait(2000);
        } else {
              cy.log("No Item To Delete");
        }
    });
})
