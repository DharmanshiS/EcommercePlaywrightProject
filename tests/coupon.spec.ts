import { test, expect } from './fixtures/fixtures';
import * as fs from 'fs';
import { CartPage } from './POM/CartPage';
import { ShopPage } from './POM/ShopPage';
import { Coupon } from '../models/coupon';

// TEST CASE 1: check the coupon is applied successfully
test('Coupon is applied successfully', async ({ loggedInNav }) => {

    console.log("\nTEST CASE 1\n");

    // Add a product to the cart
    await loggedInNav.navigateToShop();
    const shopPage = new ShopPage(loggedInNav.page);
    await shopPage.addProductToCart('Beanie');
    console.log("Added 'Beanie' to the cart.");
    await shopPage.goToCart();

    // Apply the coupon
    const coupon: Coupon  = JSON.parse(fs.readFileSync('./tests/data/coupons.json', 'utf-8'));

    const cartPage = new CartPage(loggedInNav.page);
    await cartPage.addCoupon(coupon.title);
    console.log("Successfully added the coupon code.");
    
    // Validate the discount is correctly applied
    const subtotal = await cartPage.getCartSubtotal();
    const discountFound = await cartPage.getCartTotalCouponDiscount(coupon.title);
    const expectedDiscount = parseFloat((subtotal * (coupon.discount / 100)).toFixed(2)); // 15% discount, rounded to 2dp
    const actualDiscount = parseFloat(discountFound.toFixed(2)); // Round actual discount to 2dp

    expect(actualDiscount).toEqual(expectedDiscount);  
    console.log(`The discount is ${actualDiscount} and the expected discount is ${expectedDiscount}.`)

    // Validate the total cost
    const totalCost = await cartPage.getCartTotal();
    const roundedCost = parseFloat(totalCost.toFixed(2));

    const shipping = await cartPage.getCartTotalShipping();
    const expectedTotal = parseFloat((subtotal + shipping - coupon.discount).toFixed(2));

    expect(roundedCost, 'Should have the correct cost').toEqual(expectedTotal);  
    //console.log(`The total is ${roundedCost} and the expected total is ${expectedTotal}.`)
});






