import AuthoringPage from "../../support/authoring-page.cy.js";
import MCQAuthoringPage from "../../support/mcq-authoring.cy.js";

const authoringPage = new AuthoringPage;
const mcqAuthoringPage = new MCQAuthoringPage;

context("Test Section Action Menus", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
    cy.deleteItem();
    cy.deleteSection();
  });

  describe("LARA2 Item Action Menus", () => {
    it("Add MCQ Item", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("Multiple Choice");
      authoringPage.getItemPickerList().contains("Multiple Choice (master)").click();
      authoringPage.getAddItemButton().click();
      authoringPage.getEditItemDialog().should("exist");
      authoringPage.getNameField().type("Multiple Choice Question");
      authoringPage.getPromptField(" Multiple Choice Prompt");
      authoringPage.getHintField(" Multiple Choice Hint");
      mcqAuthoringPage.selectChoiceInEditForm(0);
      authoringPage.getSaveButton().click();
    });
    it("Verify Section Level Actions", () => {
      cy.wait(6000);
      authoringPage.getSectionMove().click();
      authoringPage.getMoveModel().should("exist");
      authoringPage.getMoveModel().click();
      authoringPage.getMoveModelHeader("Move section 1 to...");
      authoringPage.getMoveModelClose().click();
      authoringPage.getSectionHide().click();
      authoringPage.verfiySectionHidden();
      authoringPage.getSectionHide().click();
      authoringPage.verfiySectionShow();
      authoringPage.getSectionCopy().click();
      cy.wait(2000);
      authoringPage.getCopySectionHeader(1).should("contain", "Section 2");
      authoringPage.getCopySectionDelete(1).click();
      cy.wait(2000);
    });
  });
});

context("Delete Item", () => {
  before(() => {
    cy.visit("");
    cy.loginLARA(Cypress.config().username);
    cy.launchActivty();
  });

  describe("Delete Item", () => {
    it("Delete Item", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuDelete().click();
    });
  });
});
