import AuthoringPage from "../../support/authoring-page.cy.js";
import ActivitySequenceSettingsPage from "../../support/activity-sequence-settings.cy.js";

const authoringPage = new AuthoringPage;
const settingsPage = new ActivitySequenceSettingsPage;

const name = {
  activity: "Test Hide Question Numbers Activity",
  sequence: "Test Hide Question Numbers Sequence",
  label: "Hide Question Numbers",
  activityHint: "Check this box if you do not want question numbers to appear to the student in this activity.",
  sequenceHint: 'Check this box if you do not want question numbers to appear to the student in all activities in this sequence. Note: This will override the "Hide Question Numbers" setting for any activities in this sequence.'
};

function beforeTestActivity(activity) {
  cy.visit("");
  cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  authoringPage.deleteActivity(activity);
}

function beforeTestSequence(sequence) {
  cy.visit("");
  cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
  authoringPage.deleteSequence(sequence);
}

context("Test hide question number setting in activity", () => {
  describe("Hide question number in activity", () => {
    it("Verify hide question number settings in activity", () => {
      beforeTestActivity(name.activity);
      settingsPage.getCreateActivityButton().click();
      settingsPage.getNewActivityPage().should("exist");
      settingsPage.getActivityName().type(name.activity);
      settingsPage.getSaveButton().click();
      settingsPage.getSettingsPage().should("exist");
      settingsPage.getHideQuestionNumbersCheckbox().should("exist");
      settingsPage.verifyHideQuestionNumbersLabel(name.label);
      settingsPage.verifyHideQuestionNumbersHint(name.activityHint);
      settingsPage.getHideQuestionNumbersCheckbox().invoke("attr", "checked").should("not.exist");
      settingsPage.getHideQuestionNumbersCheckbox().click();
      settingsPage.getSettingsPageSave().click();
      cy.wait(2000);
      settingsPage.getHideQuestionNumbersCheckbox().invoke("attr", "checked").should("exist");
    });
  });
});

context("Test hide question number setting in sequence", () => {
  describe("Hide question number in sequence", () => {
    it("Verify hide question number settings in sequence", () => {
      beforeTestSequence(name.activity);
      settingsPage.getCreateSequenceButton().click();
      settingsPage.getSettingsPage().should("exist");
      settingsPage.getSeqTitle().type(name.sequence);
      settingsPage.getSequenceHideQuestionNumbersCheckbox().should("exist");
      settingsPage.verifySequenceHideQuestionNumbersLabel(name.label);
      settingsPage.verifySequenceHideQuestionNumbersHint(name.sequenceHint);
      settingsPage.getSequenceHideQuestionNumbersCheckbox().invoke("attr", "checked").should("not.exist");
      settingsPage.getSequenceHideQuestionNumbersCheckbox().click();
      settingsPage.getSettingsPageSave().click();
      cy.wait(2000);
      settingsPage.getSequenceHideQuestionNumbersCheckbox().invoke("attr", "checked").should("exist");
    });
  });
});
