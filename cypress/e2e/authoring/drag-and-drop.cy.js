import AuthoringPage from "../../support/authoring-page.cy.js";
import DragAndDropAuthoringPage from "../../support/drag-and-drop-authoring.cy.js";

const authoringPage = new AuthoringPage;
const dragAndDropAuthoringPage = new DragAndDropAuthoringPage;

const image = {
    imageUrl1: "https://placekitten.com/50/60",
    imageUrl2: "https://placekitten.com/50/61",
    imageUrl3: "https://placekitten.com/50/62",
    imageUrl4: "https://placekitten.com/50/65"
};

context("Test Authoring Preview", () => {
  before(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
    cy.deleteItem();
  });

  describe("LARA2 Drag And Drop Authoring Preview", () => {
    it("Add Drag And Drop Item", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("Drag and Drop");
      authoringPage.getItemPickerList().contains("Drag and Drop (Master)").click();
      authoringPage.getAddItemButton().click();
      authoringPage.getEditItemDialog().should("exist");
      authoringPage.getNameField().type("Drag and Drop Question");
      authoringPage.getPromptField(" Drag the cats to the right positions");
      dragAndDropAuthoringPage.getBackgroundImageUrl().type("https://placekitten.com/392/343");
      dragAndDropAuthoringPage.clickPlusButton();
      dragAndDropAuthoringPage.getImageUrl(0).type(image.imageUrl1);
      dragAndDropAuthoringPage.clickPlusButton();
      dragAndDropAuthoringPage.getImageUrl(1).type(image.imageUrl2);
      dragAndDropAuthoringPage.clickPlusButton();
      dragAndDropAuthoringPage.getImageUrl(2).type(image.imageUrl3);
      dragAndDropAuthoringPage.clickPlusButton();
      dragAndDropAuthoringPage.getImageUrl(3).type(image.imageUrl4);
      authoringPage.getSaveButton().click();
    });
    it("Verify Added Drag And Drop Item In Authoring Preview", () => {
      cy.wait(2000);
      authoringPage.getSectionItemHeader().should("contain", "Drag and Drop Question");
      dragAndDropAuthoringPage.getDraggableItem(0, image.imageUrl1);
      dragAndDropAuthoringPage.getDraggableItem(1, image.imageUrl2);
      dragAndDropAuthoringPage.getDraggableItem(2, image.imageUrl3);
      dragAndDropAuthoringPage.getDraggableItem(3, image.imageUrl4);
    });
  });
});

context("Test Item Preview", () => {
  before(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.loginLARA(Cypress.config().username);
    cy.launchActivty();
  });

  describe("LARA2 Drag And Drop Item Preview", () => {
    it("Verify Added Drag And Drop Item In Item Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      dragAndDropAuthoringPage.getItemPreviewDraggableItem(0, image.imageUrl1);
      dragAndDropAuthoringPage.getItemPreviewDraggableItem(1, image.imageUrl2);
      dragAndDropAuthoringPage.getItemPreviewDraggableItem(2, image.imageUrl3);
      dragAndDropAuthoringPage.getItemPreviewDraggableItem(3, image.imageUrl4);
    });
  });
});

context("Delete Drag And Drop", () => {
  before(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.loginLARA(Cypress.config().username);
    cy.launchActivty();
  });

  describe("Delete Drag And Drop Item", () => {
    it("Delete Item", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuDelete().click();
    });
  });
});
