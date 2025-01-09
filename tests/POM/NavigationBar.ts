import { Page, Locator } from '@playwright/test';

export class NavigationBar {

    // Fields
    page: Page;
    shopNavigation: Locator;
    logoutNavigation: Locator;
    ordersNavigation: Locator;
    myAccountNavigation: Locator;
    cartSymbol: Locator;
    cartMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators
        this.shopNavigation = page.locator('#menu-item-43 > a');
        this.logoutNavigation = page.locator('li[class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--customer-logout"] a');
        this.ordersNavigation = page.locator('li[class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--orders"] a');
        this.myAccountNavigation = page.locator('#menu-item-46 > a');
        this.cartSymbol = page.locator('#site-header-cart > li:nth-child(1) > a');
        this.cartMessage = page.locator('.woocommerce-mini-cart__empty-message');
    }

    // Service Methods
    async navigateToShop(): Promise<void> {
        await this.shopNavigation.click();
    }

    async navigateToOrders(): Promise<void> {
        await this.ordersNavigation.click();
    }

    async navigateToMyAccount(): Promise<void> {
        await this.myAccountNavigation.click();
    }

    async logout(): Promise<void> {
        await this.logoutNavigation.click();
    }

    async hoverOverCartSymbol(): Promise<void> {
        await this.cartSymbol.hover();
    }

    async viewCartFromSymbol(): Promise<void> {
        await this.cartSymbol.click();
    }

    async getCartEmptyMessage() {
        //await this.hoverOverCartSymbol();
        return this.cartMessage; 
    }
}
