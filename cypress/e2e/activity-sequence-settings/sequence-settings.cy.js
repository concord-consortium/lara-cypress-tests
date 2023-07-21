import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivitySequenceSettingsPage from "../../support/activity-sequence-settings.cy.js";
import ActivityPlayerPreview from "../../support/activity-player-preview.cy.js";

const authoringPage = new AuthoringPage;
const settingsPage = new ActivitySequenceSettingsPage;
const activityPreview = new ActivityPlayerPreview;

const url = {
    imageUrl: "https://learn-resources.concord.org/tutorials/images/brogan-acadia.jpg"
};

context("Test Create Sequence", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.deleteNewSequence();
  });

  describe("Create Sequence", () => {
    it("Create Sequence", () => {
      settingsPage.getCreateSequenceButton().click();
      settingsPage.getSettingsPage().should("exist");
      settingsPage.getSeqTitle().type("Test Automation Create Sequence");
      settingsPage.getSettingsPageSave().click();
      cy.wait(2000);
    });
  });
});

context("Test Sequence Settings", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  });

  describe("Sequence Settings", () => {
    it("Sequence Settings", () => {
      authoringPage.searchActivitySequence("Test Automation Create Sequence");
      authoringPage.getSequenceEditMenu().click();
      settingsPage.getGlossaryDropDown().should("not.exist");
      settingsPage.getSeqBackgroundImageUrl().type(url.imageUrl);
      settingsPage.getSeqPreviewImageUrl().type(url.imageUrl);
      settingsPage.clickThumbailPreview();
      settingsPage.getThumbailPreview(url.imageUrl);
      settingsPage.getSeqIndexPageText().type("This Is Home Page Text");
      settingsPage.clickInsertImage();
      settingsPage.getEditImageDialog().should("exist");
      settingsPage.getSourceField().type(url.imageUrl);
      settingsPage.getInsertImageOkButton().click();
      settingsPage.getSettingsPageSave().click();
      cy.wait(2000);
      settingsPage.addActivity();
      settingsPage.clickAddButton();
    });
  });
});

context("Test Sequence Settings In Authoring Home Page & Activity Player Runtime Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  });

  describe("Verify Sequence Settings In Home Page", () => {
    it("Sequence Settings In Authoring Home Page", () => {
      authoringPage.searchActivitySequence("Test Automation Create Sequence");
      authoringPage.getSequenceDetails().should("contain", "This Is Home Page Text");
      authoringPage.getSequenceDetailImage(url.imageUrl);
    });
    it("Verify Activity Preview In Activity Player Runtime", () => {
      authoringPage.previewSequence("Test Automation Create Sequence");
      activityPreview.getSequenceActivityTitle().should("contain", "Test Automation Create Sequence");
      activityPreview.getSequenceTitle().should("contain", "Test Automation Create Sequence");
      activityPreview.getSequenceDescription().should("contain", "This Is Home Page Text");
      activityPreview.getSequenceEstimate().should("contain", "Estimated Time to Complete This Module:");
    });
  });
});
