import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivitySequenceSettingsPage from "../../support/activity-sequence-settings.cy.js";
import ActivityPlayerPreview from "../../support/activity-player-preview.cy.js";

const authoringPage = new AuthoringPage;
const settingsPage = new ActivitySequenceSettingsPage;
const activityPreview = new ActivityPlayerPreview;

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
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
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
      settingsPage.getIndexPageText().type("This Is Home Page Text");
      settingsPage.clickInsertImage();
      settingsPage.getEditImageDialog().should("exist");
      settingsPage.getSourceField().type(url.imageUrl);
      settingsPage.getInsertImageOkButton().click();
      settingsPage.getSettingsPageSave().click();
      cy.wait(2000);
    });
  });
});

context("Test Activity Settings In Authoring Home Page & Activity Player Runtime Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  });

  describe("Verify Activity Settings In Home Page", () => {
    it("Activity Settings In Authoring Home Page", () => {
      authoringPage.searchActivitySequence("Test Automation Create Activity");
      authoringPage.getActivityDetails().should("contain", "This Is Home Page Text");
      authoringPage.getActivityDetailImage(url.imageUrl);
    });
    it("Verify Activity Preview In Activity Player Runtime", () => {
      authoringPage.previewActivity("Test Automation Create Activity");
      activityPreview.getActivityTitle().should("contain", "Test Automation Create Activity");
      activityPreview.getReadAloudToggle().should("exist");
      activityPreview.getIntroText().should("contain", "This Is Home Page Text");
      activityPreview.getIntroTextImage(url.imageUrl);
      activityPreview.getActivityThumbnail(url.imageUrl);
      activityPreview.getPagesHeader().should("contain", "Pages in this Activity");
    });
  });
});
