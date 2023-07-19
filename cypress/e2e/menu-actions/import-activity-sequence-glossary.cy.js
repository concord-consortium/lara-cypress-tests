import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivitySequenceSettingsPage from "../../support/activity-sequence-settings.cy.js";
import GlossarySettings from "../../support/glossary/glossary-settings.cy.js";

const authoringPage = new AuthoringPage;
const settingsPage = new ActivitySequenceSettingsPage;
const glossarySettings = new GlossarySettings;

const file = {
    activity: "cypress/fixtures/activities/test-automation-activity.json",
    sequence: "cypress/fixtures/sequences/test-automation-sequence.json",
    glossary: "cypress/fixtures/glossary/test-automation-glossary.json"
};

context("Test Import Activity", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.deleteImportActivity();
  });

  describe("Import Activity", () => {
    it("Import Test Activity", () => {
      authoringPage.getImportButton().click();
      authoringPage.getImportModel().should("exist");
      authoringPage.getImportModelHeader();
      authoringPage.getImportFile(file.activity);
      authoringPage.getImportModelButton().click();
      cy.wait(2000);
      settingsPage.getSettingsPage().should("exist");
      settingsPage.verifyEditActivityName("Test Automation Activity");
      settingsPage.getEditActivityName().clear().type("Import Test Automation Activity");
      settingsPage.getEditActivitySaveButton().click();
      cy.wait(2000);
    });
  });
});

context("Delete Import Test Activity", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  });

  describe("Delete Import Test Activity", () => {
    it("Verify Delete Import Activity", () => {
      authoringPage.searchActivitySequence("Import Test Automation Activity");
      authoringPage.getActivityDeleteMenu().click();
      cy.wait(2000);
      authoringPage.clickHomePageLink();
      authoringPage.searchActivitySequence("Import Test Automation Activity");
      authoringPage.getActivity().should("not.exist");
    });
  });
});

context("Test Import Sequence", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.deleteImportSequence();
  });

  describe("Import Sequence", () => {
    it("Import Test Sequence", () => {
      authoringPage.getImportButton().click();
      authoringPage.getImportModel().should("exist");
      authoringPage.getImportModelHeader();
      authoringPage.getImportFile(file.sequence);
      authoringPage.getImportModelButton().click();
      cy.wait(2000);
      settingsPage.getSettingsPage().should("exist");
      settingsPage.verifyEditSequenceName("Test Automation Sequence");
      settingsPage.getEditSequenceName().clear().type("Import Test Automation Sequence");
      settingsPage.getEditSequenceSaveButton().click();
      cy.wait(2000);
    });
  });
});

context("Delete Import Test Sequence", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  });

  describe("Delete Import Test Sequence", () => {
    it("Verify Delete Import Sequence", () => {
      authoringPage.searchActivitySequence("Import Test Automation Sequence");
      authoringPage.getSequenceDeleteMenu().click();
      cy.wait(2000);
      authoringPage.clickHomePageLink();
      authoringPage.searchActivitySequence("Import Test Automation Activity");
      authoringPage.getSequence().should("not.exist");
    });
  });
});

context("Test Import Glossary", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.deleteImportGlossary();
  });

  describe("Import Glossary", () => {
    it("Import Test Glossary", () => {
      authoringPage.getImportButton().click();
      authoringPage.getImportModel().should("exist");
      authoringPage.getImportModelHeader();
      authoringPage.getImportFile(file.glossary);
      authoringPage.getImportModelButton().click();
      cy.wait(2000);
      glossarySettings.getGlossaryNameField().should('have.value', 'Test Automation Glossary');
      glossarySettings.getEditSaveButton().click();
      glossarySettings.getGlossaryNameField().clear().type("Import Test Automation Glossary");
      glossarySettings.getEditSaveButton().click();
      cy.wait(2000);
    });
  });
});

context("Delete Import Test Glossary", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  });

  describe("Delete Import Test Glossary", () => {
    it("Verify Delete Import Glossary", () => {
      authoringPage.searchActivitySequence("Import Test Automation Glossary");
      authoringPage.getGlossaryDeleteMenu().click();
      cy.wait(2000);
      authoringPage.clickHomePageLink();
      authoringPage.searchActivitySequence("Import Test Automation Glossary");
      authoringPage.getGlossary().should("not.exist");
    });
  });
});
