import { test, expect } from './fixtures/fixtures';

import { CartPage } from './POM/CartPage';
import { ShopPage } from './POM/ShopPage';
import { NavigationBar } from './POM/NavigationBar';



// TEST CASE 1: check the coupon is applied successfully



test('Coupon is applied successfully', async ({ loggedInPage }) => {

    console.log("\nTEST CASE 1\n");

    // Add a product to the cart
    const navigationBar = new NavigationBar(loggedInPage);
    await navigationBar.navigateToShop();
    const shopPage = new ShopPage(loggedInPage);
    await shopPage.addProductToCart('Beanie');
    console.log("Added 'Beanie' to the cart.");
    await shopPage.goToCart();

    // Apply the coupon
    const cartPage = new CartPage(loggedInPage);
    await cartPage.addCoupon('edgewords');
    console.log("Successfully added the coupon code.");
    
    // Validate the discount is correctly applied
    const subtotal = await cartPage.getCartSubtotal();
    const discount = await cartPage.getCartTotalCouponDiscount('edgewords');
    const expectedDiscount = parseFloat((subtotal * 0.15).toFixed(2)); // 15% discount, rounded to 2dp
    const actualDiscount = parseFloat(discount.toFixed(2)); // Round actual discount to 2dp

    expect(actualDiscount).toEqual(expectedDiscount);  
    console.log(`The discount is ${actualDiscount} and the expected discount is ${expectedDiscount}.`)

    // Validate the total cost
    const totalCost = await cartPage.getCartTotal();
    const roundedCost = parseFloat(totalCost.toFixed(2));

    const shipping = await cartPage.getCartTotalShipping();
    const expectedTotal = parseFloat((subtotal + shipping - discount).toFixed(2));

    expect(roundedCost).toEqual(expectedTotal);  
    console.log(`The total is ${roundedCost} and the expected total is ${expectedTotal}.`)
});






