import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivitySequenceSettingsPage from "../../support/activity-sequence-settings.cy.js";

const authoringPage = new AuthoringPage;
const settingsPage = new ActivitySequenceSettingsPage;

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
    cy.loginLARA(Cypress.config().username);
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
      settingsPage.getSeqIndexPageText().type("This Is Index Page Text");
      settingsPage.clickInsertImage();
      settingsPage.getEditImageDialog().should("exist");
      settingsPage.getSourceField().type(url.imageUrl);
      settingsPage.getInsertImageOkButton().click();
      settingsPage.getSettingsPageSave().click();
      cy.wait(2000);
    });
  });
});

context("Test Sequence Settings In Authoring Home Page", () => {
  before(() => {
    cy.visit("");
    cy.loginLARA(Cypress.config().username);
  });

  describe("Verify Sequence Settings In Home Page", () => {
    it("Sequence Settings In Home Page", () => {
      authoringPage.searchActivitySequence("Test Automation Create Sequence");
      authoringPage.getSequenceDetails().should("contain", "This Is Index Page Text");
      authoringPage.getSequenceDetailImage(url.imageUrl);
    });
  });
});
