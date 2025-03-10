// this suite stopped working during a Cypress refactor.
// The missing function is deleteMaterial
// It may be possible to bring it back.
// The PR of interest is https://github.com/concord-consortium/lara-cypress-tests/pull/2/
// For now we skip the tests

context.skip('Runtime state saving', function () {
  let materialUrl
  beforeEach(() => {
    cy.login()
    cy.importMaterial("sequences/simple-sequence.json").then(url =>
      materialUrl = url
    )
  })
  afterEach(() => {
    cy.deleteMaterial(materialUrl)
  })


  it('marks activity as completed once user responds to all the questions', () => {
    cy.visit(materialUrl)
    cy.get(".activities .activity-bg .banner").should("not.exist")
    cy.get(".activities .activity").first().click()
    cy.get("[value='Begin activity']").click()
    cy.get("[name='embeddable_open_response_answer[answer_text]']").type("test answer").blur()
    cy.wait(300)
    cy.get(".sequence_title").click()
    cy.get(".activities .activity-bg .banner .text").should("have.text", "Completed")
  })
})
