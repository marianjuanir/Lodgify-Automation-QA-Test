import pricingData from "../data/pricing.json"
import { titleCase } from "title-case"

describe('Pricing tests', () => {
    beforeEach(() => {
        cy.visit('https://www.lodgify.com/pricing/')
    })

    context('Pricing calculations', () => {
        it("calculates 50 rentals' monthly fee for Starter, Professional and Ultimate plans", () => {
            let numOfRentals = 50
            let pricePeriod = "monthly"
            let currency = "usd"
            let currencySymbol = "$"
            let planOptions = pricingData[currency][pricePeriod][numOfRentals]

            cy.selectPricePeriod(pricePeriod)
            cy.enterNumOfRentals(numOfRentals)

            for (let p in planOptions) {
                cy.checkPlanPrice(titleCase(p), currencySymbol, planOptions[p])
            }
        })

        it("changes currency based on selected currency and calculates correctly", () => {
            let numOfRentals = 50
            let pricePeriod = "monthly"
            let currencies = [["eur", "€", "€ EUR"], ["gbp", "£", "£ GBP"]]

            cy.selectPricePeriod(pricePeriod)
            cy.enterNumOfRentals(numOfRentals)

            for (let curr = 0; curr < currencies.length; curr++) {
                let currency = currencies[curr][0]
                let currencySymbol = currencies[curr][1]
                let currencySelection = currencies[curr][2]
                let planOptions = pricingData[currency][pricePeriod][numOfRentals]

                cy.log(`***** Change currency to ${currencySelection} *****`)
                cy.selectValueFromDropdown(currencySelection)

                for (let p in planOptions) {
                    cy.checkPlanPrice(titleCase(p), currencySymbol, planOptions[p])
                }
            }
        })
    })

    context('Get Started redirects', () => {
        it("redirects to Get Started page once Get Started button for Lite plan is clicked", () => {
            cy.clickGetStarted("Lite")
        })

        it("redirects to Get Started page once Get Started button for Starter plan is clicked", () => {
            cy.clickGetStarted("Starter")
        })

        it("redirects to Get Started page once Get Started button for Professional plan is clicked", () => {
            cy.clickGetStarted("Professional")
        })

        it("redirects to Get Started page once Get Started button for Ultimate plan is clicked", () => {
            cy.clickGetStarted("Ultimate")
        })
    })

    context('Plan benefits', () => {
        it('checks the benefits of Lite plan', () => {
            let benefits = [
                "Bookable Website",
                "Property Management System",
                "Channel Manager",
                "Reservation & Payment System",
                "Guest Messaging",
                "Instant Booking"
            ]

            for (let benefit of benefits) {
                cy.checkBenefits('Lite', benefit)
            }
        })
        it('checks the benefits of Starter plan', () => {
            let benefits = [
                "Lower Booking Fee",
                "Request to Book",
                "Ad-Free Branding",
                "Free Domain",
                "Email Support",
                "Free Onboarding Sessions*"
            ]

            for (let benefit of benefits) {
                cy.checkBenefits('Starter', benefit)
            }
        })
        it('checks the benefits of Professional plan', () => {
            let benefits = [
                "No Booking Fee",
                "Manual Payments",
                "Damage Protection Pre-Authorization",
                "Advanced Guest Messaging",
                "Google Vacation Rentals",
                "Phone Support"
            ]

            for (let benefit of benefits) {
                cy.checkBenefits('Professional', benefit)
            }
        })
        it(`checks the benefits of Ultimate plan`, () => {
            let benefits = [
                "Expanded Dashboard",
                "Cleaning & Task Management",
                "Accounting",
                "Owner Management",
                "Guest App",
                "Priority Customer Support across All Channels"
            ]

            for (let benefit of benefits) {
                cy.checkBenefits('Ultimate', benefit)
            }
        })
    })

})
