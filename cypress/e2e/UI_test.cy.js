/// <reference types="Cypress" />
import { testShoppingCart} from '../support/helper'
import {appData} from '../fixtures/fixtures.json'

describe('Business Critical UI Scenario', () => {
    var standard_user = appData.standard_user
    var locked_out_user = appData.locked_out_user

    beforeEach(() => {
        cy.visit('/')
    })

    it('UI Happy Path | Do a basic checkout process using standard user', () => {
        testShoppingCart(standard_user)
    });

    it('UI Happy Path | Do a basic checkout process using locked out user', () => {
        testShoppingCart(locked_out_user)
        cy.assertTheUserIsLockedOut()
    });

})