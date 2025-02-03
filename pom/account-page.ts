import { BasePage } from './base-pom';

export class AccountPage extends BasePage{

    // Fields
    accountTitle = this.page.locator('#post-7 > header > h1');

    // Service methods
    async getAccountTitle() {
        return this.accountTitle;
    }
}