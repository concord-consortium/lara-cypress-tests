class AuthoringPage {
  getAddItem() {
    return cy.get(".editPageContainer .edit-items-container.full-row .lineAdjust");
  }
  getItemPickerSearch() {
    return cy.get("#modalContent #itemPickerSearch input");
  }
  getItemPickerList() {
    return cy.get("#modalContent #itemPickerList li button");
  }
  getAddItemButton() {
    return cy.get("#modalContent .actionButtons .lineAdjust");
  }

//*******************************************************************************************

  getEditItemDialog() {
    return cy.get(".modalContainer.itemEditDialog");
  }
  getEditItemForm() {
    return this.getEditItemDialog().find('#itemEditForm');
  }
  getSaveButton() {
    return this.getEditItemForm().find(".actionButtons .save .lineAdjust");
    cy.wait(6000);
  }
  getCancelButton() {
    return this.getEditItemForm().find(".actionButtons .cancel");
  }
  getNameField() {
    return this.getEditItemForm().find('#name');
  }
  getPromptField(prompt) {
    cy.wait(6000);
    this.getEditItemForm().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('#root_prompt').type(prompt);
    });
  }
  getHintField(hint) {
    this.getEditItemForm().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('#root_hint').type(hint);
    });
  }
  selectRequiredCheckBox() {
    this.getEditItemForm().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('#root_required').click();
    });
  }
  enterPostSubmissionFeedback(feedback) {
    this.getEditItemForm().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('#root_predictionFeedback').type(feedback);
    });
    // cy.wait(6000);
  }

//*******************************************************************************************

  getEditItemPreview() {
    return this.getEditItemDialog().find('.itemEditPreview');
  }
  getPrompt(prompt) {
    this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.runtime--prompt--question-int').should("contain", prompt);
    });
  }
  getSubmitButton() {
  return  this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-cy=lock-answer-button]');
    });
  }
  getLockedInfoHeader() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.locked-info--header--question-int');
    });
  }
  getLockedInfoFeedback() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.locked-info--feedback--question-int');
    });
  }

  //***************************************************************************************************************

  getInteractive() {
    return cy.get(".itemsContainer .sectionItemContainer");
  }
  getSectionItemHeader() {
    return this.getInteractive().find(".menuStart");
  }
  getSectionMenuEdit() {
    return this.getInteractive().find(".menuEnd button").eq(1);
  }
  getSectionMenuDelete() {
    return this.getInteractive().find(".menuEnd button").eq(4);
  }
  getAuthoringPreviewPrompt(prompt) {
    this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.runtime--prompt--question-int').should("contain", prompt);
    });
  }
  getAuthoringPreviewSubmitButton() {
  return  this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-cy=lock-answer-button]');
    });
  }
  getAuthoringPreviewLockedInfoHeader() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.locked-info--header--question-int');
    });
  }
  getAuthoringPreviewLockedInfoFeedback() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.locked-info--feedback--question-int');
    });
  }
}
export default AuthoringPage;
