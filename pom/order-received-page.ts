import { BasePage } from './base-pom';

export class OrderReceivedPage extends BasePage {

    // Fields
    readonly orderNumber =  this.page.locator('li[class="woocommerce-order-overview__order order"] strong');
    
    // Service methods
    async getOrderNumber(): Promise<string> {
        return await this.orderNumber.innerText();
    }
}