import AuthoringPage from "../../support/authoring-page.cy.js";

const authoringPage = new AuthoringPage;

context("Test Sequence Copy Action Menu", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.deleteCopySequence();
    cy.searchSequence();
  });

  describe("Copy Sequence Action Menu", () => {
    it("Verify Copy Actions", () => {
      authoringPage.getSequenceCopyMenu().click();
      cy.wait(2000);
      authoringPage.getSettingsPage().should("exist");
      authoringPage.getSettingsPageSave();
      authoringPage.clickHomePageLink();
    });
  });
});

context("Test Sequence Publish Action Menu", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.searchSequence();
  });

  describe("Publish Sequence Action Menu", () => {
    it("Verify Publish Actions", () => {
      authoringPage.searchActivitySequence("Copy of Test Automation Sequence");
      authoringPage.getSequencePublishMenu().click();
      cy.wait(2000);
      authoringPage.getPublishModel().should("exist");
      authoringPage.getPublishLink().click();
      cy.wait(2000);
      authoringPage.getPublishStatus().should("contain", "published");
      authoringPage.getPublishModelClose().click();
      cy.wait(2000);
    });
  });
});

context("Test Sequence Delete Action Menu", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.searchSequence();
  });

  describe("Delete Sequence Action Menu", () => {
    it("Verify Delete Actions", () => {
      authoringPage.searchActivitySequence("Copy of Test Automation Sequence");
      authoringPage.getSequenceDeleteMenu().click();
      cy.wait(2000);
      authoringPage.clickHomePageLink();
      authoringPage.searchActivitySequence("Copy of Test Automation Sequence");
      authoringPage.getSequence().should("not.exist");
    });
  });
});
