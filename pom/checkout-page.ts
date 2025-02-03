import { BasePage } from './base-pom';

export class CheckoutPage extends BasePage{

    // Fields
    firstNameField = this.page.locator('#billing_first_name');
    lastNameField = this.page.locator('#billing_last_name');
    streetAddressField = this.page.locator('#billing_address_1');
    cityField = this.page.locator('#billing_city');
    postcodeField = this.page.locator('#billing_postcode');
    phoneField = this.page.locator('#billing_phone');

    // Service methods
    async fillBillingDetails(firstName: string, lastName: string, street: string, city: string, postcode: string, phone: string): Promise<void> {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.streetAddressField.fill(street);
        await this.cityField.fill(city);
        await this.postcodeField.fill(postcode);
        await this.phoneField.fill(phone);
    }

    async placeOrder(): Promise<void> {
        // Using JavaScript to click on the button to avoid StaleElementException
        await this.page.evaluate(() => {
            const placeOrderButton = document.querySelector('#place_order') as HTMLElement;
            placeOrderButton.click();
        });
    }
}