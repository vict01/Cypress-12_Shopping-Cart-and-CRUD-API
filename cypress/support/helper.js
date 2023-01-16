/// <reference types="cypress" />
import { appData, personalData } from '../fixtures/fixtures.json'

export function testShoppingCart(user) {
    var appUser = user
    var password = appData.password
    var product1 = 1
    var product2 = 2
    var priceProduct1
    var priceProduct2

    cy.doLogin(appUser, password)
    cy.isTheUserEnabled().then(el => {
        if (el) {
            cy.addProductToCardById(product2).then(() => {

                cy.getPriceByProductId(product2).then(el => {
                    priceProduct2 = cleanNumber(el.text()) * 1
                })

                cy.getPriceByProductId(product1).then(el => {
                    cy.addProductToCardById(product1)
                    priceProduct1 = cleanNumber(el.text()) * 1
                    cy.log(`Price product 1: ${priceProduct1} and product 2: ${priceProduct2}`)

                    cy.goToShoppingCart()
                    cy.clickOnCheckout()
                    cy.completeInfoPriorGoingToShoppingCart(personalData.firstName, personalData.lasttName, personalData.zipCode)
                    cy.getTotalWithoutTaxes().then(el => {
                        let totalWithoutTaxes = cleanNumber(el.text()) * 1
                        cy.log(`Total without taxes: ${totalWithoutTaxes}`)
                        let ItemsTotal = priceProduct1 + priceProduct2
                        cy.log(`Sum of total products: ${ItemsTotal}`)
                        expect(totalWithoutTaxes).to.eq(ItemsTotal)
                    })
                })
            })
        }
    })

}

export function cleanString(str) {
    return str.replace(/[^\w]/g, '').toLowerCase()
}

export function roundNumber(number) {
    return Math.round(number);
}

export function cleanNumber(number) {
    let lastLimit = number.indexOf('/') > 0 ? number.indexOf('/') : number.length
    return number.substring(number.indexOf('$') + 1, lastLimit);
}

export function removeContentAfterFirstDot(str) {
    let lastLimit = str.indexOf('.') > 0 ? str.indexOf('.') : str.length
    return str.substring(0, lastLimit);
}
