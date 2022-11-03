import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivitySequenceSettingsPage from "../../support/activity-sequence-settings.cy.js";

const authoringPage = new AuthoringPage;
const settingsPage = new ActivitySequenceSettingsPage;

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
      settingsPage.getActivityName().type("Test Automation Create Activity");
      settingsPage.getSaveButton().click();
      settingsPage.getSettingsPage().should("exist");
    });

  });
});

context("Test Activity Settings", () => {
  before(() => {
    cy.visit("");
    cy.loginLARA(Cypress.config().username);
  });

  describe("Activity Settings", () => {
    it("Activity Settings", () => {
      authoringPage.searchActivitySequence("Test Automation Create Activity");
      authoringPage.getActivityEditMenu().click();
      settingsPage.getGlossaryDropDown().should("be.enabled");
      settingsPage.getBackgroundImageUrl().type(url.imageUrl);
      settingsPage.getPreviewImageUrl().type(url.imageUrl);
      settingsPage.clickThumbailPreview();
      settingsPage.getThumbailPreview(url.imageUrl);
      settingsPage.getIndexPageText().type("This Is Index Page Text");
      settingsPage.clickInsertImage();
      settingsPage.getEditImageDialog().should("exist");
      settingsPage.getSourceField().type(url.imageUrl);
      settingsPage.getInsertImageOkButton().click();
      settingsPage.getSettingsPageSave().click();
      cy.wait(2000);
    });
  });
});

context("Test Activity Settings In Authoring Home Page", () => {
  before(() => {
    cy.visit("");
    cy.loginLARA(Cypress.config().username);
  });

  describe("Verify Activity Settings In Home Page", () => {
    it("Activity Settings In Home Page", () => {
      authoringPage.searchActivitySequence("Test Automation Create Activity");
      authoringPage.getActivityDetails().should("contain", "This Is Index Page Text");
      authoringPage.getActivityDetailImage(url.imageUrl);
    });
  });
});
