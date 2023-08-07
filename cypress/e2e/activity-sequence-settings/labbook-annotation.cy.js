import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivityPlayerPreview from "../../support/activity-player-preview.cy.js";
import LabbookAuthoringPage from "../../support/labbook-authoring.cy.js";

const authoringPage = new AuthoringPage;
const activityPlayerPreview = new ActivityPlayerPreview;
const labbookAuthoringPage = new LabbookAuthoringPage;

context("Test Annotation Tool Hide in Labbook Interactive", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    authoringPage.launchActivity("Automation Activity For Labbook Annotation");
    cy.deleteItem();
  });

  describe("Labbook Hide Annotation", () => {
    it("Create Labbook Interactive With Hide Annotation", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("Lab Book");
      authoringPage.getItemPickerList().contains("Lab Book (AWS)").click();
      authoringPage.getAddItemButton().click();
      authoringPage.getEditItemDialog().should("exist");
      authoringPage.getNameField().type("Labbook Question");
      authoringPage.getPromptField(" Labbook Question Prompt");
      labbookAuthoringPage.selectBackgroundSource("URL");
      labbookAuthoringPage.enterBackgroundImageUrl("https://learn-resources.concord.org/tutorials/images/brogan-acadia.jpg");
      authoringPage.verifyHideAnnotationToolLabel();
      authoringPage.verifyHideAnnotationToolCheckboxLabel();
      authoringPage.getHideAnnotationToolCheckbox().click();
      cy.wait(4000);
      authoringPage.getSaveButton().click();
      cy.wait(6000);
    });
  });
});

context("Hide Annotation Preview In Activity Player Runtime", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    authoringPage.previewActivity("Automation Activity For Labbook Annotation");
  });

  describe("Preview activity in Activity Player Runtime", () => {
    it("Verify annotation tool is not displayed", () => {
      activityPlayerPreview.getActivityTitle().should("contain", "Automation Activity For Labbook Annotation");
      activityPlayerPreview.clickPageItem(0);
      cy.wait(5000);
      labbookAuthoringPage.verifyAnnotationToolNotDisplayed();
    });
  });
});

context("Test Annotation Tool Unhide in Labbook Interactive", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    authoringPage.launchActivity("Automation Activity For Labbook Annotation");
  });

  describe("Labbook Unhide Annotation", () => {
    it("Labbook Interactive  Unhide Annotation", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      authoringPage.getSectionItemHeader().should("contain", "Labbook Question");
      authoringPage.getHideAnnotationToolCheckbox().click();
      cy.wait(4000);
      authoringPage.getSaveButton().click();
      cy.wait(6000);
    });
  });
});

context("Unhide Annotation Preview In Activity Player Runtime", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    authoringPage.previewActivity("Automation Activity For Labbook Annotation");
  });

  describe("Preview activity in Activity Player Runtime", () => {
    it("Verify annotation tool is displayed", () => {
      activityPlayerPreview.getActivityTitle().should("contain", "Automation Activity For Labbook Annotation");
      activityPlayerPreview.clickPageItem(0);
      cy.wait(5000);
      labbookAuthoringPage.verifyAnnotationToolDisplayed();
    });
  });
});
