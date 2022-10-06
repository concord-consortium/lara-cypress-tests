class LabbookAuthoringPage {
  getEditItemDialog() {
    return cy.get(".modalContainer.itemEditDialog");
  }

  //***************************************************************************************************************

  getEditItemPreview() {
    return this.getEditItemDialog().find('.itemEditPreview');
  }

  getEditPreviewPrompt(prompt) {
    this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.base-app--runtime--question-int p').should("contain", prompt);
    });
  }
  getEditPreviewDrawingTool() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('#drawing-tool-container');
    });
  }
  getEditPreviewUploadButton() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-test=upload-btn]');
    });
  }
  getEditPreviewCommentField() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-testid=comment-field]');
    });
  }
  getEditPreviewThumbnailChooser() {
    return this.getEditItemPreview().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.thumbnail-chooser--thumbnail-chooser-list--question-int');
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
  getAuthoringPreviewDrawingTool() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('#drawing-tool-container');
    });
  }
  getAuthoringPreviewUploadButton() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-test=upload-btn]');
    });
  }
  getAuthoringPreviewCommentField() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('[data-testid=comment-field]');
    });
  }
  getAuthoringPreviewThumbnailChooser() {
    return this.getInteractive().find('iframe').then($iframe => {
      const $body = $iframe.contents().find('#app')
            cy.wrap($body).find('.thumbnail-chooser--thumbnail-chooser-list--question-int');
    });
  }
}
export default LabbookAuthoringPage;
