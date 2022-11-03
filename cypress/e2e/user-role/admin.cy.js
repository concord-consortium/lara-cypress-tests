import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivitySequenceSettingsPage from "../../support/activity-sequence-settings.cy.js";

const authoringPage = new AuthoringPage;
const settingsPage = new ActivitySequenceSettingsPage;

context("Test Admin User Role", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  });

  describe("LARA2 Admin User Role", () => {
    it("Admin User Role", () => {
      settingsPage.getCreateActivityButton().should("exist");
      settingsPage.getCreateSequenceButton().should("exist");
      settingsPage.getCreateGlossaryButton().should("exist");
      authoringPage.searchActivitySequence("Teacher 2 Automation Activity");
      authoringPage.getActivityEditMenu().should("exist");
      authoringPage.getActivityDeleteMenu().should("exist");
      authoringPage.getActivityPublishMenu().should("exist");
      authoringPage.searchActivitySequence("Teacher 2 Automation Sequence");
      authoringPage.getSequenceEditMenu().should("exist");
      authoringPage.getSequenceDeleteMenu().should("exist");
      authoringPage.getSequencePublishMenu().should("exist");
      authoringPage.searchActivitySequence("Teacher 2 Automation Glossary");
      authoringPage.getGlossaryEditMenu().should("exist");
      authoringPage.getGlossaryDeleteMenu().should("exist");
    });
  });
});
