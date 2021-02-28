/// <reference types="cypress" />

context('E-mail', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should send email with selected comics', () => {
    cy.intercept('api/mail').as('api');

    cy.get(
      ':nth-child(1) > .comic-liststyles__ComidCardInfo-rhapof-3 > .select'
    ).click();

    cy.get('[data-testid=toggle_drawer]').click();

    cy.get('[data-testid=from_name]').type('TestFrom', { force: true });
    cy.get('[data-testid=from_email]').type('from@email.com', { force: true });
    cy.get('[data-testid=to_name]').type('TestTo', { force: true });
    cy.get('[data-testid=to_email]').type('to@email.com', { force: true });
    cy.get('[data-testid=subject]').type('Test send email', { force: true });

    cy.get('[data-testid=submit_email]').click();

    cy.wait('@api').then(() => {
      cy.get('.Toastify__toast-body').should('have.text', 'E-mail sent.');

      cy.get('[data-testid=from_name]').should('have.value', '');
      cy.get('[data-testid=from_email]').should('have.value', '');
      cy.get('[data-testid=to_name]').should('have.value', '');
      cy.get('[data-testid=to_email]').should('have.value', '');
      cy.get('[data-testid=subject]').should('have.value', '');
    });
  });
});
