/// <reference types="cypress" />

context('Comics', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open comic details', () => {
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

      cy.get(
        ':nth-child(1) > .comic-liststyles__ComicCardImage-rhapof-2 > img'
      ).click();

      cy.get('.utils__FlexColumn-z6eiwa-1 > :nth-child(1) > span').should(
        'have.text',
        'Iron Man (2020) #6'
      );
    });
  });

  it('should show a message when no data is found', () => {
    cy.intercept('https://gateway.marvel.com/v1/public/comics*').as('api');

    cy.get('[data-testid=title]')
      .clear()
      .type('asdasdasdasdasd')
      .should('have.value', 'asdasdasdasdasd');

    cy.wait(1000);

    cy.get('[data-testid=submit]').click();

    cy.wait(1000);

    cy.wait('@api').then(() => {
      cy.get('p').should('have.text', 'No data...');
    });
  });

  it('should open the drawer', () => {
    cy.get('[data-testid=toggle_drawer]').click();

    cy.get('.drawerstyles__Container-sc-1i5pr9z-0').should('exist');
  });

  it('should disable the send email button by default', () => {
    cy.get('[data-testid=toggle_drawer]').click();

    cy.get('.drawerstyles__Container-sc-1i5pr9z-0').should('exist');

    cy.get('[data-testid=submit_email]').should('be.disabled');
  });

  it('should select the comics and show then on drawer', () => {
    cy.get(
      ':nth-child(1) > .comic-liststyles__ComidCardInfo-rhapof-3 > .select'
    ).click();

    cy.get('[data-testid=toggle_drawer]').click();

    cy.get(
      '.formstyles__StyledForm-sc-1fe8kj8-0 > .comic-liststyles__ComicGrid-rhapof-0 > :nth-child(1) > .comic-liststyles__ComidCardInfo-rhapof-3 > :nth-child(1)'
    ).should('have.text', ' Fantastic Four by Dan Slott Vol. 1 (Hardcover)');
  });
});
