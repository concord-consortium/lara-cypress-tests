import AddLanguage from "../../support/glossary/add-language.cy.js";
import AddEditDeleteTerm from "../../support/glossary/add-edit-delete-term.cy.js";

const addLanguage = new AddLanguage;
const addEditDeleteTerm = new AddEditDeleteTerm;

const langProperties = {
    term: "Translated Term",
    definition: "Translated Term Definition",
    diggingDeeper: "Translated Term Digging Deeper",
    imageAltText: "Translated Term Image Alt Text",
    imageCaption: "Translated Term Image Caption",
    videoAltText: "Translated Term Video Alt Text",
    videoCaption: "Translated Term Video Caption",
    chinese: "Language: Chinese (0/1)",
    hawaiian: "Language: Hawaiian (0/1)"
};

context("Test Additional Language", () => {
  before(() => {
    cy.visit("");
    cy.loginLARAWithSSO(Cypress.config().username, Cypress.env("password"));
    cy.launchGlossary();
    cy.deleteLanguage();
  });

  describe("Verify Additional Language", () => {
    it("Add Language", () => {
      addLanguage.selectLanguage('Chinese');
      addLanguage.getAddLanguageButton().click();
      addLanguage.getLanguagePanelHeader(1).should("contain", langProperties.chinese);
      addLanguage.selectLanguage('Hawaiian');
      addLanguage.getAddLanguageButton().click();
      addLanguage.getLanguagePanelHeader(2).should("contain", langProperties.hawaiian);
    });
    it("Delete Language", () => {
      addLanguage.getLanguagePanelDelete(1).click();
      addLanguage.getLanguagePanelHeader(1).should("not.contain", langProperties.chinese);
      addLanguage.getLanguagePanelHeader(1).should("contain", langProperties.hawaiian);
    });
    it("Edit Language", () => {
      addLanguage.getLanguageEditLink().click();
      addLanguage.getTermField().type(langProperties.term);
      addLanguage.getDefinitionField().type(langProperties.definition);
      addLanguage.getDiggingDeeperField().type(langProperties.diggingDeeper);
      addLanguage.getImageCaptionField().type(langProperties.imageCaption);
      addLanguage.getImageAltTextField().type(langProperties.imageAltText);
      addLanguage.getVideoCaptionField().type(langProperties.videoCaption);
      addLanguage.getVideoAltTextField().type(langProperties.videoAltText);
      addLanguage.getSaveButton().click();
    });
    it("Verify Preview For Edited Language", () => {
      addLanguage.getTermPopupPreviewDefinition().should("contain", langProperties.definition);
      addLanguage.getTermPopupPreviewDefinitionReadAloud().should("exist");
      addLanguage.getTermPopupPreviewViewPhoto().should("exist");
      addLanguage.getTermPopupPreviewViewVideo().should("exist");
      addLanguage.getTermPopupPreviewViewPhoto().click();
      addLanguage.getTermPopupPreviewImageContainer().should("exist");
      addLanguage.getTermPopupPreviewImageCaption().should("contain", langProperties.imageCaption);
      addLanguage.getTermPopupPreviewImageCaptionReadAloud().should("exist");
      addLanguage.getTermPopupPreviewImageZoomButton().click();
      addLanguage.getTermPopupPreviewImageZoomCaption().should("contain", langProperties.imageCaption);
      addLanguage.getTermPopupPreviewImageZoomCaptionReadAloud().should("exist");
      addLanguage.getTermPopupPreviewImageZoomClose().click();
      cy.wait(500);
      addLanguage.getTermPopupPreviewViewPhoto().click();
      addLanguage.getTermPopupPreviewImageContainer().should("not.exist");
      addLanguage.getTermPopupPreviewViewVideo().click();
      addLanguage.getTermPopupPreviewVideoContainer().should("exist");
      addLanguage.getTermPopupPreviewVideoCaption().should("contain", langProperties.videoCaption);
      addLanguage.getTermPopupPreviewVideoCaptionReadAloud().should("exist");
      addLanguage.getSaveCloseButton().click();
    });
    it("Verify Edited Language In Table", () => {
      addLanguage.getLanguageFirstRow().should("contain", "Test Term");
      addLanguage.getLanguageFirstRow().should("contain", langProperties.term);
      addLanguage.getLanguageFirstRow().should("contain", langProperties.definition);
      addLanguage.getLanguageRowDiggingDeeper().should("contain", "✓");
      addLanguage.getLanguageRowImageCaption().should("contain", "✓");
      addLanguage.getLanguageRowVideoCaption().should("contain", "✓");
    });
    it("Verify Second Language In Glossary Terms & Definitions", () => {
      addEditDeleteTerm.getTermsDefinitionsTableEditLink().click();
      cy.wait(1000);
      addEditDeleteTerm.selectSecondLanguage('Hawaiian');
      addEditDeleteTerm.getLanguageSelector().should("exist");
      addEditDeleteTerm.selectLanguage("Hawaiian").click();
      addEditDeleteTerm.getTermPopupPreviewDefinition().should("contain", langProperties.definition);
      addLanguage.getTermPopupPreviewViewPhoto().click();
      addEditDeleteTerm.getTermPopupPreviewImageCaption().should("contain", langProperties.imageCaption);
      addEditDeleteTerm.getTermPopupPreviewImageZoomButton().click();
      addEditDeleteTerm.getTermPopupPreviewImageZoomCaption().should("contain", langProperties.imageCaption);
      addEditDeleteTerm.getTermPopupPreviewImageZoomClose().click();
      addLanguage.getTermPopupPreviewViewVideo().click();
      addEditDeleteTerm.getTermPopupPreviewVideoContainer().should("exist");
      addEditDeleteTerm.getTermPopupPreviewVideoCaption().should("contain", langProperties.videoCaption);
      addEditDeleteTerm.getSaveCloseButton().click();
    });
    it("Delete Translated Language Term", () => {
      addLanguage.getLanguageDeleteLink().click();
      addLanguage.getLanguageFirstRow().should("contain", "Test Term");
      addLanguage.getLanguageFirstRow().should("not.contain", langProperties.term);
      addLanguage.getLanguageFirstRow().should("not.contain", langProperties.definition);
      addLanguage.getLanguageRowDiggingDeeper().should("contain", "✗");
      addLanguage.getLanguageRowImageCaption().should("contain", "✗");
      addLanguage.getLanguageRowVideoCaption().should("contain", "✗");
      addLanguage.getLanguagePanelDelete(1).click();
    });
  });
});
