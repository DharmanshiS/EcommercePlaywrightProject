import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

    // Fields
    page: Page;
    firstNameField: Locator;
    lastNameField: Locator;
    streetAddressField: Locator;
    cityField: Locator;
    postcodeField: Locator;
    phoneField: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators
        this.firstNameField = page.locator('#billing_first_name');
        this.lastNameField = page.locator('#billing_last_name');
        this.streetAddressField = page.locator('#billing_address_1');
        this.cityField = page.locator('#billing_city');
        this.postcodeField = page.locator('#billing_postcode');
        this.phoneField = page.locator('#billing_phone');
    }

    // Service methods
    async fillBillingDetails(details: { firstName: string, lastName: string, street: string, city: string, postcode: string, phone: string }): Promise<void> {
        await this.firstNameField.fill(details.firstName);
        await this.lastNameField.fill(details.lastName);
        await this.streetAddressField.fill(details.street);
        await this.cityField.fill(details.city);
        await this.postcodeField.fill(details.postcode);
        await this.phoneField.fill(details.phone);
    }

    async placeOrder(): Promise<void> {
        // Using JavaScript to click on the button to avoid StaleElementException
        await this.page.evaluate(() => {
            const placeOrderButton = document.querySelector('#place_order') as HTMLElement;
            placeOrderButton.click();
        });
    }
}