/// <reference types="cypress" />
import { appData } from '../fixtures/fixtures.json'

Cypress.Commands.add('intercepApiRequest', (url, alias) => {
    cy.intercept(url).as(alias)
})

Cypress.Commands.add('assertApiRequest', (alias, expectedStatusCode) => {
    cy.wait(`@${alias}`, { log: false }).then(interception => {
        expect(interception.response.statusCode).eq(expectedStatusCode)
    })
})

Cypress.Commands.add('doLogin', (user, password) => {
    cy.get('[data-test="username"]').type(user)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
})

Cypress.Commands.add('getItemsById', (productId) => {    
    cy.get('.inventory_item_description').eq(productId).click()
})

Cypress.Commands.add('addProductToCardById', (productId) => {    
    cy.get('.btn.btn_primary.btn_small.btn_inventory').eq(productId).click()
})

Cypress.Commands.add('getPriceByProductId', (productId) => {
    cy.get('.inventory_item_description .inventory_item_price').eq(productId)
})

Cypress.Commands.add('goToShoppingCart', () => {
    cy.get('.shopping_cart_link').click()
})

Cypress.Commands.add('clickOnCheckout', () => {
    cy.get('#checkout').click()
})

Cypress.Commands.add('completeInfoPriorGoingToShoppingCart', (name, lastname, zip_code) => {
    cy.url('match', 'expectedUrl').then(el => {
        if (el.indexOf(appData.url_infoPriorGoingToShoppingCart) > -1) {
            cy.get('[data-test="firstName"]').type(name)
            cy.get('[data-test="lastName"]').type(lastname)
            cy.get('[data-test="postalCode"]').type(zip_code)
            cy.get('[data-test="continue"]').click()
        }
    })
})

Cypress.Commands.add('getTotalWithoutTaxes', () => {
    cy.get('.summary_subtotal_label')
})

Cypress.Commands.add('isTheUserEnabled', () => {
    cy.get('body').then($body => {
        if ($body.find('[data-test="error"]').length) {
            return false
        }else{
            return true
        }
    });
});

Cypress.Commands.add('assertTheUserIsLockedOut', () => {
    cy.findAllByText(/this user has been locked out/i).should('be.visible')
});