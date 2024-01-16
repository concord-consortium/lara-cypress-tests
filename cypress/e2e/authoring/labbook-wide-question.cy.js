import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivityPlayerPreview from "../../support/activity-player-preview.cy.js";
import LabbookAuthoringPage from "../../support/labbook-authoring.cy.js";

const authoringPage = new AuthoringPage;
const labbookAuthoringPage = new LabbookAuthoringPage;
const activityPlayerPreview = new ActivityPlayerPreview;

context("Test Background Source As URL", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
    cy.deleteItem();
  });

  describe("LARA Labbook Wide With Background Source As URL", () => {
    it("Add Labbook Item", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("Lab Book wide");
      authoringPage.getItemPickerList().contains("Lab Book Wide (AWS)").click();
      authoringPage.getAddItemButton().click();
      authoringPage.getEditItemDialog().should("exist");
      authoringPage.getNameField().type("Labbook Wide Question");
      authoringPage.getPromptField(" Labbook Wide Question Prompt");
      authoringPage.getHintField(" Labbook Wide Question Hint");
      labbookAuthoringPage.selectBackgroundSource("URL");
      labbookAuthoringPage.enterBackgroundImageUrl("https://learn-resources.concord.org/tutorials/images/brogan-acadia.jpg");
      labbookAuthoringPage.getHideToolbarButtonsField().should("exist");
      labbookAuthoringPage.getHideToolbarButtonsField().parent().find('label').should("contain", "Hide Toolbar Buttons");
      labbookAuthoringPage.getHideToolbarButtonsField().should("contain", "Check the boxes below to hide draw tool buttons from the toolbar:");
      labbookAuthoringPage.verifyHideToolbarButtons();
      labbookAuthoringPage.selectHideToolbarButtons(2);
      authoringPage.verifyExportToMediaLibraryLabel();
      authoringPage.verifyExportToMediaLibraryCheckboxLabel();
      authoringPage.verifyExportToMediaLibraryHelpContent();
      authoringPage.getExportToMediaLibraryCheckbox().click();
      authoringPage.verifyUploadFromLibraryLabel();
      authoringPage.verifyUploadFromMediaLibraryCheckboxLabel();
      authoringPage.verifyUploadFromMediaLibraryHelpContent();
      authoringPage.getUploadFromMediaLibraryCheckbox().click();
      cy.wait(2000);
      authoringPage.getSaveButton().click();
      cy.wait(6000);
    });
  });
});

context("Test In Authoring Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
  });

  describe("LARA Authoring Preview", () => {
    it("Verify Added Labbook Item In Authoring Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionItemHeader().should("contain", "Labbook Wide Question");
      labbookAuthoringPage.getAuthoringPreviewPrompt("Labbook Wide Question Prompt");
      labbookAuthoringPage.getAuthoringPreviewDrawingTool().should("exist");
      labbookAuthoringPage.getAuthoringPreviewUploadButton().should("exist");
      labbookAuthoringPage.getAuthoringPreviewCommentField().should("exist");
      labbookAuthoringPage.getAuthoringPreviewThumbnailChooser().should("exist");
    });
  });
});

context("Test In Item Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
  });

  describe("LARA Item Preview", () => {
    it("Verify Added Labbook Item In Authoring Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      authoringPage.getSectionItemHeader().should("contain", "Labbook Wide Question");
      labbookAuthoringPage.getEditPreviewPrompt("Labbook Wide Question Prompt");
      labbookAuthoringPage.getEditPreviewDrawingTool().should("exist");
      labbookAuthoringPage.getEditPreviewUploadButton().should("exist");
      labbookAuthoringPage.getEditPreviewCommentField().should("exist");
      labbookAuthoringPage.getEditPreviewThumbnailChooser().should("exist");
      authoringPage.verifyExportToMediaLibraryCheckboxChecked();
      authoringPage.verifyUploadFromMediaLibraryCheckboxChecked();
    });
  });
});

context("Labbook Wide Preview In Activity Player Runtime", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    authoringPage.previewActivity("Automation Question Interactives Activity");
  });

  describe("Preview activity in Activity Player Runtime", () => {
    it("Verify hidden draw tool is not displayed", () => {
      activityPlayerPreview.getActivityTitle().should("contain", "Automation Question Interactives Activity");
      activityPlayerPreview.clickPageItem(0);
      cy.wait(10000);
      labbookAuthoringPage.verifyDrawToolDisplayed("Free hand drawing tool");
      labbookAuthoringPage.verifyDrawToolDisplayed("Basic shape tool");
      labbookAuthoringPage.verifyDrawToolNotDisplayed("Annotation tool");

    });
  });
});

context("Delete Image", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
  });

  describe("Delete Labbook Item", () => {
    it("Delete Item", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuDelete().click();
    });
  });
});
