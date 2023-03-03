/// <reference types="cypress" />
import { titleCase } from "title-case"

/**
 * Selects the price period
 * @param strPricePeriod - price period to select, e.g. Monthly, Yearly or Two Years
 * 
 */
Cypress.Commands.add('selectPricePeriod', (strPricePeriod) => {
    strPricePeriod = titleCase(strPricePeriod)
    cy.get('li[data-price-period]').contains(strPricePeriod).click()
})

/**
 * Enters a value in the Number of Rentals input
 * @param sValue - input value
 * 
 */
Cypress.Commands.add('enterNumOfRentals', (sValue) => {
    cy.get('input#scroll-prop-plan').focus().click().clear().type(sValue).should('have.value', sValue)

})

/**
 * Checks that the Plan price displayed is correct
 * @param sPlanName - plan to check, e.g. Lite, Starter, Professional or Ultimate
 * @param sExpectedCurrency - expected currency displayed
 * @param sExpectedPrice - expected price displayed
 * 
 */
Cypress.Commands.add('checkPlanPrice', (sPlanName, sExpectedCurrency, sExpectedPrice) => {
    cy.get('.plan-name').contains(sPlanName).siblings('.plan-price').find('.currency-symbol').contains(sExpectedCurrency)
    cy.get('.plan-name').contains(sPlanName).siblings('.plan-price').find('.total-sum').contains(sExpectedPrice)

})

/**
 * Selects the currency for pricing
 * @param sValue - currency to select
 * 
 */
Cypress.Commands.add('selectValueFromDropdown', (sValue) => {
    cy.get('select.price-currency-select').select(sValue)
})

/**
 * Clicks the Get Started button of the supplied Plan
 * @param sPlanName - Plan, e.g. Lite, Starter, Professional or Ultimate
 * 
 */
Cypress.Commands.add('clickGetStarted', (sPlanName) => {
   cy.window().then(win => {
        cy.stub(win, 'open').as('open')
    })
    cy.get('.plan-name').contains(sPlanName).parent().siblings().find('a').contains('Get Started').click()
    cy.get('@open').should('have.been.calledOnceWithExactly', 'https://use.lodgify.com/start')

})

/**
 * Checks that the benefit is only for the supplied Plan
 * @param sPlanName - Plan, e.g. Lite, Starter, Professional or Ultimate
 * @param sBenefit - benefit to check
 * 
 */
Cypress.Commands.add('checkBenefits', (sPlanName, sBenefit) => {
    cy.get('.plan-feature-lists').find('ul li').contains(sBenefit).its('length').should("equal", 1)
    cy.get('.plan-feature-lists').find('ul li').contains(sBenefit).parent().parent().siblings().find('.plan-name').contains(sPlanName)
})


