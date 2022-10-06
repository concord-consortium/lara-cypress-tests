import AuthoringPage from "../../support/authoring-page.cy.js";
import TESideTipAuthoringPage from "../../support/teacher-edition-side-tip-authoring.cy.js";

const authoringPage = new AuthoringPage;
const teSideTipAuthoringPage = new TESideTipAuthoringPage;

context("Test Authoring Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
    cy.deleteItem();
  });

  describe("LARA2 TE Side Tip", () => {
    it("Add TE Side Tip", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("Teacher Edition");
      authoringPage.getItemPickerList().contains("Teacher Edition: Side Tip").click();
      authoringPage.getAddItemButton().click();
      cy.wait(6000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      authoringPage.getEditItemDialog().should("exist");
      teSideTipAuthoringPage.typeContent("Teacher Edition Side Tip");
      teSideTipAuthoringPage.verifySideTipContent("Teacher Edition Side Tip");
      teSideTipAuthoringPage.clickSaveButton();
    });
    it("Verify TE Question Wrapper In Authoring Preview", () => {
      cy.wait(6000);
      teSideTipAuthoringPage.getAuthoringPreview();
    });
  });
});

context("Delete Item", () => {
  before(() => {
    cy.visit("");
    cy.loginLARA(Cypress.config().username);
    cy.launchActivty();
  });

  describe("Delete TE Side Tip", () => {
    it("Delete TE Side Tip", () => {
      cy.wait(6000);
      teSideTipAuthoringPage.getSectionMenuDelete().click();
    });
  });
});
