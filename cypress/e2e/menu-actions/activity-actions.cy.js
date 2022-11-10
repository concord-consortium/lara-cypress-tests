import AuthoringPage from "../../support/authoring-page.cy.js";

const authoringPage = new AuthoringPage;

context("Test Activity Copy Action Menu", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.deleteCopyActivity();
    cy.searchActivty();
  });

  describe("Copy Activity Action Menu", () => {
    it("Verify Copy Actions", () => {
      authoringPage.getActivityCopyMenu().click();
      cy.wait(2000);
      authoringPage.getSettingsPage().should("exist");
      authoringPage.getSettingsPageSave();
      authoringPage.clickHomePageLink();
    });
  });
});

context("Test Activity Publish Action Menu", () => {
  before(() => {
    cy.visit("");
    cy.loginLARA(Cypress.config().username);
    cy.searchActivty();
  });

  describe("Publish Activity Action Menu", () => {
    it("Verify Publish Actions", () => {
      authoringPage.searchActivitySequence("Copy of Test Automation Activity");
      authoringPage.getActivityPublishMenu().click();
      cy.wait(2000);
      authoringPage.getPublishModel().should("exist");
      authoringPage.getPublishLink().click();
      cy.wait(2000);
      authoringPage.getPublishStatus().should("contain", "published");
      authoringPage.getPublishModelClose().click();
      authoringPage.searchActivitySequence("Copy of Test Automation Activity");
      authoringPage.getActivityDetailPublished().should("contain", "last published");
      cy.wait(2000);
    });
  });
});

context("Test Activity Delete Action Menu", () => {
  before(() => {
    cy.visit("");
    cy.loginLARA(Cypress.config().username);
    cy.searchActivty();
  });

  describe("Delete Activity Action Menu", () => {
    it("Verify Delete Actions", () => {
      authoringPage.searchActivitySequence("Copy of Test Automation Activity");
      authoringPage.getActivityDeleteMenu().click();
      cy.wait(2000);
      authoringPage.clickHomePageLink();
      authoringPage.searchActivitySequence("Copy of Test Automation Activity");
      authoringPage.getActivity().should("not.exist");
    });
  });
});
