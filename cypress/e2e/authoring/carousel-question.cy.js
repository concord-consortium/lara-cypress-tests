import AuthoringPage from "../../support/authoring-page.cy.js";
import CarouselAuthoringPage from "../../support/carousel-authoring.cy.js";

const authoringPage = new AuthoringPage;
const carouselAuthoringPage = new CarouselAuthoringPage;

context("Test Authoring Preview", () => {
  before(() => {
    cy.visit("https://lara2-staging.concordqa.org/");
    cy.loginLARAWithSSO("sara_teacher1", "password1");
    cy.launchActivty();
    cy.deleteItem();
  });

  describe("LARA2 Carousel Authoring Preview", () => {
    it("Add carousel Item", () => {
      authoringPage.getAddItem().click();
      authoringPage.getItemPickerSearch().type("Carousel Interactive");
      authoringPage.getItemPickerList().contains("Carousel Interactive (Master)").click();
      authoringPage.getAddItemButton().click();
      cy.wait(6000);
      authoringPage.getEditItemDialog().should("exist");
      authoringPage.getNameField().type("Carousel Question");
      authoringPage.getPromptField(" Carousel Prompt");
      carouselAuthoringPage.clickPlusButton();
      carouselAuthoringPage.selectInteractive("Open response", 0);
      carouselAuthoringPage.selectAuthoring(0);
      cy.wait(6000);
      carouselAuthoringPage.getPrompt(" Open response Prompt", 0);
      carouselAuthoringPage.clickPlusButton();
      carouselAuthoringPage.selectInteractive("Multiple choice", 1);
      carouselAuthoringPage.selectAuthoring(1);
      cy.wait(6000);
      carouselAuthoringPage.getPrompt(" Multiple Choice Prompt", 1);
      carouselAuthoringPage.selectChoice(0, 1);
      carouselAuthoringPage.clickPlusButton();
      carouselAuthoringPage.selectInteractive("Fill in the blank", 2);
      carouselAuthoringPage.selectAuthoring(2);
      cy.wait(6000);
      carouselAuthoringPage.getPrompt(" Enter the answer [blank-1]", 2);
      authoringPage.getSaveButton().click();
    });
    it("Verify Added Carousel Item In Authoring Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionItemHeader().should("contain", "Carousel Question");
      carouselAuthoringPage.getAuthoringPreviewPrompt("Open response Prompt");
      carouselAuthoringPage.getAuthoringPreviewResponseTextArea().should("exist");
      carouselAuthoringPage.clickSlideButton(1);
      cy.wait(6000);
      carouselAuthoringPage.getAuthoringPreviewPrompt("Multiple Choice Prompt");
      carouselAuthoringPage.getAuthoringPreviewChoice("Choice A");
      carouselAuthoringPage.clickSlideButton(2);
      cy.wait(6000);
      carouselAuthoringPage.getAuthoringPreviewFibPrompt("Enter the answer ");
      carouselAuthoringPage.getAuthoringPreviewFibTextArea().should("exist");
    });
  });
});

context("Test Item Preview", () => {
  before(() => {
    cy.visit("https://lara2-staging.concordqa.org/");
    cy.loginLARA("sara_teacher1");
    cy.launchActivty();
  });

  describe("LARA2 Carousel Item Preview", () => {
    it("Verify Added carousel Item In Item Preview", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuEdit().click();
      cy.wait(6000);
      carouselAuthoringPage.getItemPreviewPrompt("Open response Prompt");
      carouselAuthoringPage.getResponseTextArea().should("exist");
      carouselAuthoringPage.clickItemPreviewSlideButton(1);
      cy.wait(6000);
      carouselAuthoringPage.getAuthoringPreviewPrompt("Multiple Choice Prompt");
      carouselAuthoringPage.getChoice("Choice A");
      carouselAuthoringPage.clickItemPreviewSlideButton(2);
      cy.wait(6000);
      carouselAuthoringPage.getFibPrompt("Enter the answer ");
      carouselAuthoringPage.getFibTextArea().should("exist");
    });
  });
});

context("Delete carousel", () => {
  before(() => {
    cy.visit("https://lara2-staging.concordqa.org/");
    cy.loginLARA("sara_teacher1");
    cy.launchActivty();
  });

  describe("Delete carousel Item", () => {
    it("Delete Item", () => {
      cy.wait(6000);
      authoringPage.getSectionMenuDelete().click();
    });
  });
});
