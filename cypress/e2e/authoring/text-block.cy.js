import AuthoringPage from "../../support/authoring-page.cy.js";
import TextBlockAuthoringPage from "../../support/text-block-authoring.cy.js";

const authoringPage = new AuthoringPage;
const textBlockAuthoringPage = new TextBlockAuthoringPage;

context("Test Authoring Preview", () => {
  before(() => {
    cy.visit("https://lara2-staging.concordqa.org/");
    cy.loginLARAWithSSO("sara_teacher1", "password1");
    cy.launchActivty();
    cy.deleteItem();
  });

  describe("LARA2 Text Block In Authoring Preview", () => {
    it("Add Text Block", () => {
      authoringPage.getAddItem().click();
      textBlockAuthoringPage.getTextBlockQuickAddButton().click();
      authoringPage.getAddItemButton().click();
      authoringPage.getEditItemDialog().should("exist");
      textBlockAuthoringPage.getHeadingField().type("Text Block Heading");
      textBlockAuthoringPage.getContentField("Text Block Content");
      authoringPage.getSaveButton().click();
    });
    it("Verify Added Text Block In Item Preview In Authoring Preview", () => {
      cy.wait(6000);
      textBlockAuthoringPage.getAuthoringPreviewTextBlockName().should("contain", "Text Block Heading");
      textBlockAuthoringPage.getAuthoringPreviewTextBlockContent().should("contain", "Text Block Content");
    });
  });
});

context("Test Item Preview", () => {
  before(() => {
    cy.visit("https://lara2-staging.concordqa.org/");
    cy.loginLARA("sara_teacher1");
    cy.launchActivty();
  });

  describe("LARA2 Text Block In Item Preview", () => {
    it("Verify Added Text Block In Item Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      textBlockAuthoringPage.getTextBlockName().should("contain", "Text Block Heading");
      textBlockAuthoringPage.getTextBlockContent().should("contain", "Text Block Content");
    });
  });
});

context("Delete Text Block", () => {
  before(() => {
    cy.visit("https://lara2-staging.concordqa.org/");
    cy.loginLARA("sara_teacher1");
    cy.launchActivty();
  });

  describe("Delete Text Block", () => {
    it("Delete Text Block", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuDelete().click();
    });
  });
});
