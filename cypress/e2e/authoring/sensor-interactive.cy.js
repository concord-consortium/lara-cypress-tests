import AuthoringPage from "../../support/authoring-page.cy.js";
import SensorInteractiveAuthoringPage from "../../support/sensor-interactive-authoring.cy.js";

const authoringPage = new AuthoringPage;
const sensorInteractiveAuthoringPage = new SensorInteractiveAuthoringPage;

context("Test Authoring Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchActivty();
    cy.deleteItem();
  });

  describe("LARA2 Sensor Interactive Authoring Preview", () => {
    it("Add Sensor Interactive Item", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("AP Sensor Interactive");
      authoringPage.getItemPickerList().contains("AP Sensor Interactive (master)").click();
      authoringPage.getAddItemButton().click();
      authoringPage.getEditItemDialog().should("exist");
      authoringPage.getNameField().type("Sensor Interactive Question");
      sensorInteractiveAuthoringPage.getPromptField(" Sensor Interactive Prompt");
      sensorInteractiveAuthoringPage.clickFakeSensorCheckbox();
      sensorInteractiveAuthoringPage.clickPredictDataCheckbox();
      authoringPage.getSaveButton().click();
    });
    it("Verify Added Sensor Interactive Item In Authoring Preview", () => {
      cy.wait(2000);
      authoringPage.getSectionItemHeader().should("contain", "Sensor Interactive Question");
      sensorInteractiveAuthoringPage.getSensorGraph();
      sensorInteractiveAuthoringPage.getRescaleButton();
    });
  });
});

context("Test Item Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARA(Cypress.config().username);
    cy.launchActivty();
  });

  describe("LARA2 Sensor Interactive Item Preview", () => {
    it("Verify Added Sensor Interactive Item In Item Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      sensorInteractiveAuthoringPage.getItemPreviewSensorGraph();
      sensorInteractiveAuthoringPage.getItemPreviewRescaleButton();
    });
  });
});

context("Delete Sensor Interactive", () => {
  before(() => {
    cy.visit("");
    cy.loginLARA(Cypress.config().username);
    cy.launchActivty();
  });

  describe("Delete Sensor Interactive Item", () => {
    it("Delete Item", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuDelete().click();
    });
  });
});
