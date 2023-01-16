import { appData, HTTP_Method } from "../fixtures/fixtures.json"

Cypress.Commands.add('getUsersByPage', (pageNumber) => {
    cy.request({
        url: appData.urlApi,
        qs: {
            page: pageNumber
        },
        headers: {
            contentType: appData.contentTypeAppJSON
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('getUserById', (userId) => {
    cy.request({
        url: `${appData.urlApi}${userId}`,
        headers: {
            contentType: appData.contentTypeAppJSON
        },
        failOnStatusCode: false
    })
})


Cypress.Commands.add('createUser', (name, job) => {
    cy
        .request({
            url: appData.urlApi,
            qs: {},
            method: HTTP_Method.POST,
            body:
            {
                "name": name,
                "job": job
            }
            ,
            headers: {
                authorization: appData.apiToken,
                contentType: appData.contentTypeAppJSON

            },
            failOnStatusCode: false
        })
})

Cypress.Commands.add('updateUser', (userId, name, job) => {
    cy
        .request({
            url: `${appData.urlApi}${userId}`,
            qs: {},
            method: HTTP_Method.PUT,
            body:
            {
                "name": name,
                "job": job
            }
            ,
            headers: {
                authorization: appData.apiToken,
                contentType: appData.contentTypeAppJSON
            },
            failOnStatusCode: false
        })
})

Cypress.Commands.add('deleteUser', (userId) => {
    cy
        .request({
            url: `${appData.urlApi}${userId}`,
            qs: {},
            method: HTTP_Method.DELETE,
            body: {},
            headers: {
                authorization: appData.apiToken,
                contentType: appData.contentTypeAppJSON
            },
            failOnStatusCode: false
        })
})