import AuthoringPage from "../../support/authoring-page.cy.js";
import RunTimePreview from "../../support/run-time-preview.cy.js";

const authoringPage = new AuthoringPage;
const runTimePreview = new RunTimePreview;

context("Test Authoring Runtime Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
  });

  describe("LARA Activity Player Runtime Preview", () => {
    it("Verify Activity Player Runtime Preview", () => {
      authoringPage.selectPreviewIn("Activity Player");
      authoringPage.getActivityPlayerPreview();
      authoringPage.getActivityPlayerTEPreview();
      authoringPage.clickActivityPageLink();
      authoringPage.getActivityLevelPreview();
      authoringPage.getActivityLevelTEPreview();
    });
  });
});

context("Test Activity Run Link", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.searchActivty();
  });

  describe("LARA2 Activity Run Link", () => {
    it("Verify Activity Run Link ", () => {
      authoringPage.getActivityRunLinkPreview();
    });
  });
});

context("Test Sequence Run Link", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.searchSequence();
  });

  describe("LARA Sequence Run Link", () => {
    it("Verify Sequence Run Link", () => {
      authoringPage.getSequenceRunLinkPreview();
      authoringPage.getSequenceRunMenu().click();
      runTimePreview.getSequenceContent().should("exist");
      runTimePreview.getSequenceHeaderTitle().should("contain", "Sequence: Test Automation Sequence");
      runTimePreview.getSequenceTitle().should("contain", "Test Automation Sequence");
      runTimePreview.getSequenceEstimated().should("contain", "Estimated Time to Complete This Module:");
      runTimePreview.getSequenceEstimatedTime().should("contain", "0 minutes");
      runTimePreview.getSequenceActivityName().should("contain", "Test Automation Activity");
    });
  });
});
