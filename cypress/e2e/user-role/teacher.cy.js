import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivitySequenceSettingsPage from "../../support/activity-sequence-settings.cy.js";
import AddEditDeleteTerm from "../../support/glossary/add-edit-delete-term.cy.js";

const authoringPage = new AuthoringPage;
const settingsPage = new ActivitySequenceSettingsPage;
const glossary = new AddEditDeleteTerm;

context("Test Teacher User Role", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().teacher, Cypress.env("password"));
  });

  describe("LARA2 Teacher User Role", () => {
    it("Teacher User Role", () => {
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
    it("Test Admin Created In Teacher Role", () => {
      authoringPage.searchActivitySequence("Admin Automation Activity");
      authoringPage.getActivityEditMenu().should("not.exist");
      authoringPage.getActivityDeleteMenu().should("not.exist");
      authoringPage.getActivityPublishMenu().should("not.exist");
      authoringPage.searchActivitySequence("Admin Automation Sequence");
      authoringPage.getSequenceEditMenu().should("not.exist");
      authoringPage.getSequenceDeleteMenu().should("not.exist");
      authoringPage.getSequencePublishMenu().should("not.exist");
      authoringPage.searchActivitySequence("Admin Automation Glossary");
      authoringPage.getGlossaryDeleteMenu().should("not.exist");
      authoringPage.getGlossaryEditMenu().click();
      cy.wait(2000);
      glossary.getGlossaryNotice();
      glossary.getSaveIndicator();

    });
  });
});
