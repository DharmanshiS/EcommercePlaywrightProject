import { Page, Locator } from '@playwright/test';

export class ShopPage {

    // Fields
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private addToCart(product: string): Locator {
        return this.page.locator(`a[aria-label='Add “${product}” to your cart']`);
    }

    private viewCartFromProduct(): Locator {
        return this.page.locator(`a[title='View cart']`);
    }

    // Service Methods
    async addProductToCart(product: string): Promise<void> {
        await this.addToCart(product).click();
    }

    async goToCart(): Promise<void> {
        await this.viewCartFromProduct().click();
    }
}