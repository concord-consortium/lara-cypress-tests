import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivityPlayerPreview from "../../support/activity-player-preview.cy.js";
import ImageAuthoringPage from "../../support/image-authoring.cy.js";

const authoringPage = new AuthoringPage;
const imageAuthoringPage = new ImageAuthoringPage;
const activityPlayerPreview = new ActivityPlayerPreview;

context("Test Background Source As URL", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
    cy.deleteItem();
  });

  describe("LARA Image Question With Background Source As URL", () => {
    it("Add Image Item", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("Image Question");
      authoringPage.getItemPickerList().contains("Image Question (AWS)").click();
      authoringPage.getAddItemButton().click();
      authoringPage.getEditItemDialog().should("exist");
      authoringPage.getNameField().type("Image Question");
      authoringPage.getPromptField(" Image Question Prompt");
      authoringPage.getHintField(" Image Question Hint");
      imageAuthoringPage.selectBackgroundSource("URL");
      imageAuthoringPage.enterBackgroundImageUrl("https://learn-resources.concord.org/tutorials/images/brogan-acadia.jpg");
      authoringPage.getHideToolbarButtonsField().should("exist");
      authoringPage.getHideToolbarButtonsField().parent().find('label').should("contain", "Hide Toolbar Buttons");
      authoringPage.getHideToolbarButtonsField().should("contain", "Check the boxes below to hide draw tool buttons from the toolbar:");
      authoringPage.verifyHideToolbarButtons();
      authoringPage.selectHideToolbarButtons(0);
      authoringPage.selectHideToolbarButtons(1);
      authoringPage.selectHideToolbarButtons(2);
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
    });
    it("Verify Added Image Item In Authoring Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionItemHeader().should("contain", "Image Question");
      imageAuthoringPage.getAuthoringPreviewPrompt("Image Question Prompt");
      imageAuthoringPage.getAuthoringPreviewDrawingButton().should("exist");
      imageAuthoringPage.getAuthoringPreviewImage().should("exist");
    });
  });
});

context("Image Question Preview In Activity Player Runtime", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    authoringPage.previewActivity("Automation Question Interactives Activity");
  });

  describe("Preview activity in Activity Player Runtime", () => {
    it("Verify hidden draw tools are not displayed", () => {
      activityPlayerPreview.getActivityTitle().should("contain", "Automation Question Interactives Activity");
      activityPlayerPreview.clickPageItem(0);
      cy.wait(10000);
      imageAuthoringPage.getEditButton().click();
      cy.wait(5000);
      imageAuthoringPage.verifyDrawToolNotDisplayed("Free hand drawing tool");
      imageAuthoringPage.verifyDrawToolNotDisplayed("Line tool");
      imageAuthoringPage.verifyDrawToolNotDisplayed("Basic shape tool");
      imageAuthoringPage.verifyDrawToolDisplayed("Text tool");
      imageAuthoringPage.verifyDrawToolDisplayed("Stroke color");
      imageAuthoringPage.verifyDrawToolDisplayed("Fill color");

    });
  });
});

context("Test Background Source As Upload", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
  });

  describe("LARA Image Question With Background Source As Upload", () => {

    it("Add Background Source As Upload", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      imageAuthoringPage.getPrompt("Image Question Prompt");
      imageAuthoringPage.getDrawingButton().should("exist");
      imageAuthoringPage.getImage().should("exist");
      imageAuthoringPage.selectBackgroundSource("Upload");
      authoringPage.getSaveButton().click();
    });
    it("Verify In Authoring Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionItemHeader().should("contain", "Image Question");
      imageAuthoringPage.getAuthoringPreviewPrompt("Image Question Prompt");
      imageAuthoringPage.getAuthoringPreviewUploadButton().should("exist");
      imageAuthoringPage.getAuthoringPreviewUploadButton().click();
      imageAuthoringPage.getAuthoringPreviewDropArea().should("contain", "Drop an image here or click the button below to choose an image");
      imageAuthoringPage.getAuthoringPreviewChooseFile().should("exist");
    });
  });
});

// Background Soruce as Sanpshot - Blocked due to bug #182437851

context("Test Background Source As Upload In Item Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
  });

  describe("Upload In Item Preview", () => {
    it("Verify In Item Preview With Background Source As Upload", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      imageAuthoringPage.getPrompt("Image Question Prompt");
      imageAuthoringPage.getUploadButton().should("exist");
      imageAuthoringPage.getUploadButton().click();
      imageAuthoringPage.getDropArea().should("contain", "Drop an image here or click the button below to choose an image");
      imageAuthoringPage.getChooseFile().should("exist");
      authoringPage.verifyExportToMediaLibraryCheckboxChecked();
      authoringPage.verifyUploadFromMediaLibraryCheckboxChecked();
      authoringPage.getCancelButton().click();
    });
  });
});

context("Delete Image", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
  });

  describe("Delete Image Item", () => {
    it("Delete Item", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuDelete().click();
    });
  });
});
