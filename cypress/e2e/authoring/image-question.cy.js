import AuthoringPage from "../../support/authoring-page.cy.js";
import ImageAuthoringPage from "../../support/image-authoring.cy.js";

const authoringPage = new AuthoringPage;
const imageAuthoringPage = new ImageAuthoringPage;

context("Test Background Source As URL", () => {
  before(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
    cy.deleteItem();
  });

  describe("LARA2 Image Question With Background Source As URL", () => {
    it("Add Image Item", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("Image Question");
      authoringPage.getItemPickerList().contains("Image Question (master)").click();
      authoringPage.getAddItemButton().click();
      authoringPage.getEditItemDialog().should("exist");
      authoringPage.getNameField().type("Image Question");
      authoringPage.getPromptField(" Image Question Prompt");
      authoringPage.getHintField(" Image Question Hint");
      imageAuthoringPage.selectBackgroundSource("URL");
      imageAuthoringPage.enterBackgroundImageUrl("https://hurricane.concord.org/branch/master/4ec21af35f2e4a7ebce0d2f991cbc25c.png");
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

context("Test Background Source As Upload", () => {
  before(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.loginLARA(Cypress.config().username);
    cy.launchActivty();
  });

  describe("LARA2 Image Question With Background Source As Upload", () => {

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
    cy.visit(Cypress.config().baseUrl);
    cy.loginLARA(Cypress.config().username);
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
      authoringPage.getCancelButton().click();
    });
  });
});

context("Delete Image", () => {
  before(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.loginLARA(Cypress.config().username);
    cy.launchActivty();
  });

  describe("Delete Image Item", () => {
    it("Delete Item", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuDelete().click();
    });
  });
});
