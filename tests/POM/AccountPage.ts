import { Page, Locator } from '@playwright/test';

export class AccountPage {

    // Fields
    page: Page;
    accountTitle: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators
        this.accountTitle = page.locator('#post-7 > header > h1');
    }

    // Service methods
    async getAccountTitle() {
        return await this.accountTitle;
    }
}