/// <reference types="cypress" />

context('Filters', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should search by title', () => {
    cy.intercept('https://gateway.marvel.com/v1/public/comics*').as('api');

    cy.get('[data-testid=title]')
      .clear()
      .type('iron man')
      .should('have.value', 'iron man');

    cy.wait(1000);

    cy.get('[data-testid=submit]').click();

    cy.wait(1000);

    cy.wait('@api').then(() => {
      cy.get(
        ':nth-child(1) > .comic-liststyles__ComidCardInfo-rhapof-3 > :nth-child(2)'
      ).should('have.text', 'Iron Man (2020) #6');
    });
  });

  it('should clear the filters', () => {
    cy.get('[data-testid=title]')
      .clear()
      .type('iron man')
      .should('have.value', 'iron man');

    cy.get('[data-testid=issueNumber]')
      .clear()
      .type('11')
      .should('have.value', '11');

    cy.get('[data-testid=format]')
      .select('Comic')
      .should('have.value', 'comic');

    cy.get('[data-testid=clear]').click();

    cy.get('[data-testid=title]').should('have.value', '');
    cy.get('[data-testid=issueNumber]').should('have.value', '');
    cy.get('[data-testid=format]').should('have.value', '');
  });
});
