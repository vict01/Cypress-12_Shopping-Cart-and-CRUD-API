/// <reference types="Cypress" />
import { cleanString, roundNumber } from '../support/helper'

describe('Business Critical API Scenario', () => {
    let pageNumber = 1
    let userId = 1
    let non_existingPageNumber = 104
    let non_existingUserId = 66
    let name = "Rosa " + new Date().getTime()
    let job = "Janitor " + new Date().getTime()

    it('API: Positive test | Get users by existing page', () => {
        cy.getUsersByPage(pageNumber).then(resp => {
            cy.log(JSON.stringify(resp.body))
            expect(resp.status).to.eq(200)
            expect(resp.body).to.contain.property('page');
            expect(resp.body).to.contain.property('per_page');
            expect(resp.body).to.contain.property('total');
            expect(resp.body).to.contain.property('total_pages');
            expect(resp.body).to.contain.property('data');

            let data = resp.body.data[0]
            expect(data).to.contain.property('id');
            expect(data).to.contain.property('email');
            expect(data).to.contain.property('first_name');
            expect(data).to.contain.property('last_name');
            expect(data).to.contain.property('avatar');
        })
    });

    // Bug: The expected http response code should've been 404 or other than 200
    it('API: Negative test | Get users by non-existing page', () => {
        cy.getUsersByPage(non_existingPageNumber).then(resp => {
            cy.log(JSON.stringify(resp.body))
            expect(resp.status).to.eq(404)
            let data = resp.body.data
            expect(data).to.have.lengthOf(0)
        })
    });

    it('API: Positive test | Get users by existing id', () => {
        cy.getUserById(userId).then(resp => {
            cy.log(JSON.stringify(resp.body))
            expect(resp.status).to.eq(200)

            let data = resp.body.data
            expect(data).to.contain.property('id');
            expect(data).to.contain.property('email');
            expect(data).to.contain.property('first_name');
            expect(data).to.contain.property('last_name');
            expect(data).to.contain.property('avatar');
        })
    });

    it('API: Negative test | Get users by non-existing id', () => {
        cy.getUserById(non_existingUserId).then(resp => {
            cy.log(JSON.stringify(resp.body))
            expect(resp.status).to.eq(404)

            let data = resp.body.data
            expect(data).to.be.undefined
        })
    });

    it('API: Positive test | Create users and validate response', () => {
        cy.createUser(name, job).then(resp => {
            cy.log(JSON.stringify(resp.body))
            expect(resp.status).to.eq(201)

            let data = resp.body
            cy.log(data.id)
            expect(data).to.contain.property('name');
            expect(data).to.contain.property('job');
            expect(data).to.contain.property('id');
            expect(data).to.contain.property('createdAt');
            expect(data.name).to.equal(name)
            expect(data.job).to.equal(job)
        })
    });

    // Bug: The expected http response for the Get request after creation should've been 200
    it('API: Positive test | Create users and query it after', () => {
        cy.createUser(name, job).then(resp => {
            cy.log(JSON.stringify(resp.body))
            expect(resp.status).to.eq(201)

            let data = resp.body
            cy.getUserById(data.id).then(resp => {
                cy.log(JSON.stringify(resp.body))
                expect(resp.status).to.eq(200)

                let data = resp.body.data
                expect(data).to.contain.property('id');
                expect(data).to.contain.property('email');
                expect(data).to.contain.property('first_name');
                expect(data).to.contain.property('last_name');
                expect(data).to.contain.property('avatar');
            })
        })
    });

    // Given that the Get method doesn't retrieve name and job, there's no way how to validate the update went totally well.
    it('API: Positive test | Update users by id', () => {
        cy.getUserById(userId).then(resp => {
            cy.log(JSON.stringify(resp.body))
            expect(resp.status).to.eq(200)

            let data = resp.body.data
            cy.log(`Name: ${data.first_name}, Last Name: ${data.last_name}`)

            cy.updateUser(data.id, name, job).then(resp => {
                cy.log(JSON.stringify(resp.body))
                expect(resp.status).to.eq(200)
                expect(resp.body).to.contain.property('name');
                expect(resp.body).to.contain.property('job');
                expect(resp.body).to.contain.property('updatedAt');
            })
        })
    });

    // Bug: The expected http response for the Get request after deletion should've been 404
    it('API: Positive test | Delete users by id and verify it does not exist anymore', () => {
        cy.getUserById(userId).then(resp => {
            cy.log(JSON.stringify(resp.body))
            expect(resp.status).to.eq(200)

            let data = resp.body.data
            cy.log(`Name: ${data.first_name}, Last Name: ${data.last_name}`)

            cy.deleteUser(data.id, name, job).then(resp => {
                cy.log(JSON.stringify(resp.body))
                expect(resp.status).to.eq(204)

                cy.getUserById(data.id).then(resp => {
                    let data = resp.body.data
                    cy.task('log', `${JSON.stringify(data)}`)
                    expect(data).to.be.undefined
                    expect(resp.status).to.eq(404)
                })
            })
        })
    });

})