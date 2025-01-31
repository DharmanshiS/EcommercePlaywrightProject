import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-pom';

export class ShopPage extends BasePage {

    // Fields
    readonly viewCart = this.page.getByTitle('View cart'); // locator(`a[title='View cart']`);

    // Locators
    private addToCart(product: string): Locator {
        return this.page.locator(`a[aria-label='Add “${product}” to your cart']`);
    }

    // Service Methods
    async addProductToCart(product: string): Promise<void> {
        await this.addToCart(product).click();
    }

    async goToCart(): Promise<void> {
        await this.viewCart.click();
    }
}