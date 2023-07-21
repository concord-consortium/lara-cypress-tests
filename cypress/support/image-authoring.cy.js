class ImageAuthoringPage {
  getEditItemDialog() {
    return cy.get(".modalContainer.itemEditDialog");
  }

  //***************************************************************************************************************

  getEditItemPreview() {
    return this.getEditItemDialog().find('.itemEditPreview');
  }

  getPrompt(prompt) {
    this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.base-app--runtime--question-int p').should("contain", prompt);
    });
  }

  getDrawingButton() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-test=edit-btn]');
    });
  }
  getImage() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.inline-content--inlineImg--question-int');
    });
  }
  getUploadButton() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-test=upload-btn]');
    });
  }
  getDropArea() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-test=drop-area]');
    });
  }
  getChooseFile() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('input');
    });
  }
//***************************************************************************************************************

  getEditItemForm() {
    return this.getEditItemDialog().find('#itemEditForm');
  }
  selectBackgroundSource(value) {
    this.getEditItemForm().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('#root_backgroundSource').select(value);
    });
  }
  enterBackgroundImageUrl(url) {
    this.getEditItemForm().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('#root_backgroundImageUrl').type(url);
    });
  }

//***************************************************************************************************************
  getInteractive() {
    return cy.get(".itemsContainer .sectionItemContainer");
  }
  getAuthoringPreviewPrompt(prompt) {
    this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.base-app--runtime--question-int p').should("contain", prompt);
    });
  }
  getAuthoringPreviewDrawingButton() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-test=edit-btn]');
    });
  }
  getAuthoringPreviewImage() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.inline-content--inlineImg--question-int');
    });
  }
  getAuthoringPreviewUploadButton() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-test=upload-btn]');
    });
  }
  getAuthoringPreviewDropArea() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-test=drop-area]');
    });
  }
  getAuthoringPreviewChooseFile() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('input');
    });
  }
}
export default ImageAuthoringPage;
