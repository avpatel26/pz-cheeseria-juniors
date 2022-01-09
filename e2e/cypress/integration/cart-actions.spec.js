/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');

  })

  // Purchase Item unit test case
  it('Checkout and Purchase items',() => {
    // add item to cart
    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');

    cy.get('[data-cy=open-cart]').click();

    // Checkout item
    cy.get('[data-cy=checkout-items]').click();
    cy.get('[data-cy=purchase-dialog]').should('be.visible');
    cy.get('[data-cy=purchase-button]').should('have.text','Purchase');
    cy.get('[data-cy=cancel-purchase-button]').should('have.text','Cancel');

    // Purchase item
    cy.get('[data-cy=purchase-button]').click();

    // Check purchased items in recent purchase
    cy.get('[data-cy=open-recent-purchase]').click();

    cy.get('[data-cy=purchase-2]').should('contain.text','ABBAYE DU MONT DES CATS');
    cy.get('[data-cy=purchase-3]').should('contain.text','ADELOST');
  })

})
