// <reference types="cypress" />
describe.only('Upload image', () => {
  it('Confirm users are able to upload an image', () => {
    cy.visit('/');
    cy.get('[data-cy="upload-input"]').first().selectFile('cypress/fixtures/QA_Automation_Permanent_Links_Slide_QR-CODE.png', { force: true })

    cy.get('[data-cy="slide-background"]')
      .should('be.visible')
      .readCode()
      .should('have.property', 'text', 'QA_Automation_Permanent_Links_Slide');
  });
});
