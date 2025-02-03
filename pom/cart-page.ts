import { BasePage } from './base-pom';

export class CartPage extends BasePage{

    // Fields
    couponBox = this.page.locator('#coupon_code');
    applyCouponButton = this.page.locator('button[value="Apply coupon"]');
    couponSuccessMessage = this.page.locator('#post-5 > div > div > div.woocommerce-notices-wrapper > div');
    cartSubtotal = this.page.locator('tr[class="cart-subtotal"] bdi:nth-child(1)');
    cartTotalShipping = this.page.locator('#shipping_method > li > label > span > bdi');
    cartTotalTotal = this.page.locator('tr[class="order-total"] bdi:nth-child(1)');
    checkoutButton = this.page.locator('.checkout-button.button.alt.wc-forward');

    // Service methods
    async addCoupon(coupon: string): Promise<void> {
        await this.couponBox.fill(coupon);
        await this.applyCouponButton.click();
    }

    async getCouponSuccessMessage() {
        return this.couponSuccessMessage;
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async deleteAllItems() {
        let itemsPresent: boolean;
        do {
            try {
                const deleteButton = this.page.locator('text=×').first();
                await deleteButton.click();
                await this.page.waitForTimeout(1000); // Wait for the item to be removed
                itemsPresent = await this.page.locator('text=×').count() > 0; // Check if there are more delete buttons
            } catch (e) {
                itemsPresent = false; // No more delete buttons found
            }
        } while (itemsPresent);
    }

    async getCartSubtotal() {
        const text = await this.cartSubtotal.innerText();
        return parseFloat(text.replace(/[^\d.]/g, ''));
    }

    async getCartTotalCouponDiscount(coupon: string) {
        const discountLocator = this.page.locator(`#post-5 > div > div > div.cart-collaterals > div > table > tbody > tr.cart-discount.coupon-${coupon} > td > span`);
        // `tr[class="cart-discount coupon-${coupon}"] td span`
        const text = await discountLocator.innerText();
        console.log(text);
        return parseFloat(text.replace(/[^\d.]/g, ''));
    }

    async getCartTotalShipping() {
        const text = await this.cartTotalShipping.innerText();
        return parseFloat(text.replace(/[^\d.]/g, ''));
    }

    async getCartTotal() {
        const text = await this.cartTotalTotal.innerText();
        return parseFloat(text.replace(/[^\d.]/g, ''));
    }
}