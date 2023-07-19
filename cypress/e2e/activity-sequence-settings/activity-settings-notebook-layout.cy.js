import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivitySequenceSettingsPage from "../../support/activity-sequence-settings.cy.js";
import NotebookLayout from "../../support/notebook-layout.cy.js";

const authoringPage = new AuthoringPage;
const settingsPage = new ActivitySequenceSettingsPage;
const notebookLayout = new NotebookLayout;

const url = {
    imageUrl: "https://learn-resources.concord.org/tutorials/images/brogan-acadia.jpg"
};

context("Test Create Activity", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.deleteNewActivity();
  });

  describe("Create Activity", () => {
    it("Create Activity", () => {
      settingsPage.getCreateActivityButton().click();
      settingsPage.getNewActivityPage().should("exist");
      settingsPage.getActivityName().type("Test Automation Create Activity Notebook Layout");
      settingsPage.getSaveButton().click();
      settingsPage.getSettingsPage().should("exist");
    });

  });
});

context("Test Activity Settings", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  });

  describe("Activity Settings", () => {
    it("Set activity layout to notebook", () => {
      authoringPage.searchActivitySequence("Test Automation Create Activity Notebook Layout");
      authoringPage.getActivityEditMenu().click();
      settingsPage.selectActivityLayout("Notebook");
      settingsPage.getPreviewImageUrl().type(url.imageUrl);
      settingsPage.getIndexPageText().type("This Is Home Page Text");
      settingsPage.getSettingsPageSave().click();
      cy.wait(4000);
    });
  });
});

context("Preview In Activity Player Runtime", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    authoringPage.previewActivity("Test Automation Create Activity Notebook Layout");
  });

  describe("Preview activity in notebook layout", () => {
    it("Verify activity is previewed in notebook layout", () => {
      notebookLayout.getPreviousPageButton().should("not.exist");
      notebookLayout.getNextPageButton().should("not.exist");
      notebookLayout.getActivityNavHeader(0).should("exist");
      notebookLayout.getActivityNavHeader(1).should("not.exist");
      notebookLayout.getHomeButton().should("contain", "Home");
      notebookLayout.verifyNotebookHeaderNotDisplayed();   
    });
  });
});

