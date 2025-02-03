import { BasePage } from './base-pom';

export class OrdersPage extends BasePage {

    // Fields
    readonly firstOrderNumber = this.page.locator('tbody tr:nth-child(1) td:nth-child(1) a:nth-child(1)');
    
    // Service Methods
    async getLatestOrderNumber(): Promise<string> {
        const orderNumberText = await this.firstOrderNumber.innerText();
        return orderNumberText.substring(1); // remove the '#' from the beginning so matching is easier
    }
}