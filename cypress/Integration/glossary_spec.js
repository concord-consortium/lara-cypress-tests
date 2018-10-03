context('Glossary feature test', function(){
//Prior to any of the test cases, visit the activity 'Testing - Glossary'
  before(function() {
    cy.visit('https://authoring.staging.concord.org/activities/20001/pages/304604/')
	})
//Checks that the side bar is visible
  it('Verifies that the side bar is visible', () => {
    cy.get('.sidebar-hdr').should('be.visible')
  })
  it('Verifies that the sidebar opens and closes correctly', () => {
    cy.get('.sidebar-hdr').click()
    cy.get('.sidebar-bd').should('be.visible')
    cy.get('.sidebar-hdr').click()
    cy.get('.sidebar-bd').should('not.be.visible')
    })
//Clicks on a highlighted word to assure correct definition functionality
//Then closes the definition window.
  it('Verifies a user can click a highlighted word', () => {
    cy.get('.plugin-app--ccGlossaryWord--1GiEL8kF').first().click();
    cy.get('.ui-dialog').contains('Close').click()
    cy.get('.ui-dialog').should('not.be.visible');
  })
//  *  Verifies that clicking on a non-underlined word will result in no glossary actions *    \\
//  *  Check manually, as you can not assert a lack of change in state in Cypress.        *    \\
  it('Verifies that clicking on non-underlined words will result in no actions', () => {
    cy.get('h2').contains('Testing').click(15,35)
  })
//Verifies that the sidebar glossary does not have a "Words I Have Defined"
//sub-glossary.
  it('Verifies student glossary has not yet been instantiated', () => {
    cy.get('.sidebar-hdr').click();
    cy.get('.sidebar-content').should('not.have.value','Words I Have Defined');
  })
//Verifies that the sidebar glossary does not have a "Words I Have Defined"
//sub-glossary.
  it('Verifies that predefined words are visible in glossary', () => {
    cy.get('.sidebar-content').contains('cloud');
  })
//Enters a definition as a student, clicks submit button. Then closes the
//window. Finds the same word elsewhere on the page to check if definition carried
//over.
  it('Verifies that a student can enter definition and click submit', () => {
    cy.get('.plugin-app--ccGlossaryWord--1GiEL8kF').first().click();
    cy.get('.ui-dialog').find('textarea').type('This is my definition');
    cy.get('[data-cy=submit]').click()
    cy.get('.ui-dialog').contains('Close').click()
  })
//Checks the same highlighted word after submitting definitions
  it('Verifies that definition persists in same word, same location, same page', () => {
    cy.get('.plugin-app--ccGlossaryWord--1GiEL8kF').first().click();
    cy.get('.ui-dialog-content').contains('This is my definition')
    cy.get('.ui-dialog').contains('Close').click()
  })
//Check if word persists in a new highlighted word on the same pages
  it('Verifies that definition persists in same word, different location, same page', () => {
    cy.get('.plugin-app--ccGlossaryWord--1GiEL8kF').last().click();
    cy.get('.ui-dialog-content').contains('This is my definition')
    cy.get('.ui-dialog').contains('Close').click()
  })
//Opens the next page of an activity, checks to see if the definitions submitted
//by the student persists.
  it('Verifies that definition persists in same word, different location, different page', () => {
    cy.get('.activity-nav').eq(1).find('i').eq(1).click();
    cy.get('.plugin-app--ccGlossaryWord--1GiEL8kF').first().click()
    cy.get('.ui-dialog-content').contains('This is my definition');
    cy.get('.ui-dialog').contains('Close').click()
  })
//Opens glossary, student sub-glossary should have been instantiated after
//submission of first student definition.
  it('Verifies "Words I have defined" glossary is now visible', () => {
    cy.get('.sidebar-hdr').click();
    cy.get('.sidebar-content').contains('Words I Have Defined');
    cy.get('.sidebar-hdr').click()
    cy.get('.sidebar-content')
  })
//Verifies that the definition that the student had submitted is saved in the
//side bar glossary as well.
  it('Verifies student definition persists in "Words I have defined" glossary', () => {
    cy.get('.sidebar-hdr').click()
    cy.get('.sidebar-content').contains('This is my definition');
  })
//Verifies the definition that the student had submitted is saved in the
//side bar glossary as well.
  it('Verifies student definition persists in "All Words" glossary', () => {
    cy.get('[data-cy=all-words-filter]').click();
    cy.get('.sidebar-content').contains('This is my definition').should('be.visible');
    cy.get('.sidebar-hdr').click()
  })

// Checks to see if the definition persists onto a new activity when plugin
//identifier is used. Incomplete due to limitation in visiting new page with
//same user ID in cypress given the skipping of a log-in automation step.


//  it('Verifies plugin id functionality in new activity', () => {
//    cy.visit('https://authoring.staging.concord.org/activities/20005/pages/304618/b32a7ab8-8197-4ae5-aadf-52e44753c3e4')
//    cy.get('.plugin-app--ccGlossaryWord--1GiEL8kF').first().click();
//    cy.get('.ui-dialog-content').contains('This is my definition')
//  })


})
