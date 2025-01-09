import { Page, Locator } from '@playwright/test';

export class OrderReceivedPage {

    // Fields
    page: Page;
    orderNumber: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators
        this.orderNumber = page.locator('li[class="woocommerce-order-overview__order order"] strong');
    }

    // Service methods
    async getOrderNumber(): Promise<string> {
        return await this.orderNumber.innerText();
    }
}