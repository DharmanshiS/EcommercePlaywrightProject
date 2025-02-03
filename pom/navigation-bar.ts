import { ShopPage } from './shop-page';
import { BasePage } from './base-pom';
import { OrdersPage } from './orders-page';
import { AccountPage } from './account-page';

export class NavigationBar extends BasePage {

    // Fields
    shopNavigation = this.page.locator('#menu-item-43 > a');
    logoutNavigation = this.page.locator('#post-7 > div > div > div > p:nth-child(2) > a');
    

    ordersNavigation = this.page.locator('li[class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--orders"] a');
    myAccountNavigation = this.page.locator('#menu-item-46 > a');
    cartSymbol = this.page.locator('#site-header-cart > li:nth-child(1) > a');
    cartMessage = this.page.locator('.woocommerce-mini-cart__empty-message');
    

    // Service Methods
    async navigateToShop(): Promise<ShopPage> {
        await this.shopNavigation.click();
        return new ShopPage(this.page);
    }

    async navigateToOrders(): Promise<OrdersPage> {
        await this.ordersNavigation.click();
        return new OrdersPage(this.page);
    }

    async navigateToMyAccount(): Promise<AccountPage> {
        await this.myAccountNavigation.click();
        return new AccountPage(this.page);
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
