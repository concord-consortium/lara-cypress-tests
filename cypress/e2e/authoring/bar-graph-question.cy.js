import AuthoringPage from "../../support/authoring-page.cy.js";
import BarGraphAuthoringPage from "../../support/bar-graph-authoring.cy.js";

const authoringPage = new AuthoringPage;
const barGraphAuthoringPage = new BarGraphAuthoringPage;

context("Test Authoring Preview", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    authoringPage.launchActivity("Test Automation Bar Graph Activity");
    cy.deleteItem();
  });

  describe("LARA Bar Graph Authoring Preview", () => {
    it("Add Bar Graph Item", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("Bar Graph Cypress");
      authoringPage.getItemPickerList().contains(/^Bar Graph (Cypress)/).first().click();
      authoringPage.getAddItemButton().click();
      authoringPage.getEditItemDialog().should("exist");
      authoringPage.getNameField().type("Bar Graph Question");

      cy.log("Add a bar graph prompt.");
      authoringPage.getPromptField(" Bar Graph Prompt");
      cy.log("Add a bar graph hint.");
      authoringPage.getHintField(" Bar Graph Hint");
      cy.log("Add a bar graph title.");
      barGraphAuthoringPage.getGraphTitleField("Graph Title");
      barGraphAuthoringPage.getXAxisLabelField("X axis label");
      barGraphAuthoringPage.getYAxisLabelField("Y axis label");
      barGraphAuthoringPage.getShowValuesAboveBarsCheckbox().click();
      barGraphAuthoringPage.getBarsAddButton().click();
      barGraphAuthoringPage.getBarLabel(0, "Bar 1");
      barGraphAuthoringPage.getBarValue(0, "10");
      barGraphAuthoringPage.getBarsAddButton().click();
      barGraphAuthoringPage.getBarLabel(1, "Bar 2");
      barGraphAuthoringPage.getBarValue(1, "20");
      cy.wait(2000);
      authoringPage.getSaveButton().click();
    });
    // The tests below are broken in their current state [LARA-171]. Skipping for now.
    it.skip("Verify Added Bar Graph Item In Authoring Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionItemHeader().should("contain", "Bar Graph Question");
      barGraphAuthoringPage.verifyAuthoringPreviewPrompt("Bar Graph Prompt");
      barGraphAuthoringPage.verifyAuthoringPreviewTitle("Graph Title");
      barGraphAuthoringPage.verifyAuthoringPreviewXAxisLabel("X axis label");
      barGraphAuthoringPage.verifyAuthoringPreviewYAxisLabel("Y axis label");
      barGraphAuthoringPage.verifyAuthoringPreviewBarValue(0, "10");
      barGraphAuthoringPage.verifyAuthoringPreviewBarValue(1, "20");
      
    });
    it.skip("Verify Added Bar Graph Item In Item Preview", () => {
      cy.wait(2000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      // this is broken in its current state. Commenting out for now
      barGraphAuthoringPage.verifyEditItemPreviewPrompt("Bar Graphe Prompt");
      barGraphAuthoringPage.verifyEditItemPreviewTitle("Graph Title");
      barGraphAuthoringPage.verifyEditItemPreviewXAxisLabel("X axis label");
      barGraphAuthoringPage.verifyEditItemPreviewYAxisLabel("Y axis label");
      barGraphAuthoringPage.verifyEditItemPreviewBarValue(0, "10");
      barGraphAuthoringPage.verifyEditItemPreviewBarValue(1, "20");
      authoringPage.getSaveButton().click();
    });
    it("Delete Item", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuDelete().click();
    });
  });
});
