import { test, expect } from '../fixtures/fixtures';
import { CartPage } from '../pom/cart-page';
import { ShopPage } from '../pom/shop-page';
import { Coupon } from '../models/coupon';
import '../util/custom-matchers';
import * as fs from 'fs';

// TEST CASE 1: check the coupon is applied successfully
test('Coupon is applied successfully', async ({ loggedInNav }) => {

    // Add a product to the cart
    await loggedInNav.navigateToShop();
    const shopPage = new ShopPage(loggedInNav.page);
    await shopPage.addProductToCart('Beanie');
    await shopPage.goToCart();

    // Apply the coupon
    const coupon: Coupon  = JSON.parse(fs.readFileSync('data/coupons.json', 'utf-8'));

    const cartPage = new CartPage(loggedInNav.page);
    await cartPage.addCoupon(coupon.title);
    
    // Validate the discount is correctly applied
    const subtotal = await cartPage.getCartSubtotal();
    const discountFound = await cartPage.getCartTotalCouponDiscount(coupon.title);
    const expectedDiscount = parseFloat((subtotal * ((100 - coupon.discount) / 100)).toFixed(2)); // 15% discount, rounded to 2dp
    const actualDiscount = parseFloat((subtotal - discountFound).toFixed(2)); // Round actual discount to 2dp

    //expect(actualDiscount, `The discount is ${actualDiscount} and the expected discount is ${expectedDiscount}.`).toBe(expectedDiscount);
    expect(actualDiscount).toMatchDiscount(expectedDiscount);  

    // Validate the total cost
    const totalCost = await cartPage.getCartTotal();
    const roundedCost = parseFloat(totalCost.toFixed(2));

    const shipping = await cartPage.getCartTotalShipping();
    const expectedTotal = parseFloat((expectedDiscount + shipping).toFixed(2));

    //expect(roundedCost, `The total is ${roundedCost} and the expected total is ${expectedTotal}.`).toBe(expectedTotal); 
    expect(roundedCost).toMatchTotal(expectedTotal); 
});






