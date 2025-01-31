import { test, expect } from './fixtures/fixtures';
import * as fs from 'fs';

import { AccountPage } from './POM/AccountPage';
import { LoginPage } from './POM/LoginPage';
import { CartPage } from './POM/CartPage';
import { ShopPage } from './POM/ShopPage';
import { NavigationBar } from './POM/NavigationBar';
import { CheckoutPage } from './POM/CheckoutPage';
import { OrderReceivedPage } from './POM/OrderReceivedPage';
import { OrdersPage } from './POM/OrdersPage';



// test.beforeEach(async ({page}) => {

//     await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
//     // Login
//     const loginPage = new LoginPage(page);
//     await loginPage.clickDismiss(); // Remove the warning
//     console.log("Removed the banner.");

//     await loginPage.login('d@nfocus.co.uk', 'mystrongpassword!');
//     const accountPage = new AccountPage(page);
//     await expect(accountPage.accountTitle).toContainText('My account');
//     console.log("Successfully logged in.");

// });




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
    const expectedDiscount = subtotal * 0.15;  // 15% discount
    expect(discount).toBeCloseTo(expectedDiscount, 2);  
    console.log(`The discount is ${discount} and the expected discount is ${expectedDiscount}.`)

    // Validate the total cost
    const totalCost = await cartPage.getCartTotal();
    const shipping = await cartPage.getCartTotalShipping();
    const expectedTotal = subtotal + shipping - discount;
    expect(totalCost).toBeCloseTo(expectedTotal, 2);  
    console.log(`The total is ${totalCost} and the expected total is ${expectedTotal}.`)
});




//TEST CASE 2: check that the order has been placed successfully



test('Place an Order', async ({ loggedInPage }) => {

    console.log("\nTEST CASE 2\n");

    // Add a product to the cart
    const navigationBar = new NavigationBar(loggedInPage);
    await navigationBar.navigateToShop();
    const shopPage = new ShopPage(loggedInPage);
    await shopPage.addProductToCart('Beanie');
    await shopPage.goToCart();

    // Proceed to checkout
    const cartPage = new CartPage(loggedInPage);
    await cartPage.checkout();
    console.log("Successfully pressed 'checkout'.");

    // Fill in the billing details
    const billingDetails = JSON.parse(fs.readFileSync('./tests/data/billingDetails.json', 'utf-8'));
    console.log(`The details that are entered from the JSON file are: ${billingDetails}`);
    const checkoutPage = new CheckoutPage(loggedInPage);
    await checkoutPage.fillBillingDetails(billingDetails);
    console.log("Successfully filled in the billing details.");

    // Place the order
    await checkoutPage.placeOrder();
    console.log("Successfully placed the order.");

    // Capture the order number
    const orderReceivedPage = new OrderReceivedPage(loggedInPage);
    const orderNumber = await orderReceivedPage.getOrderNumber();
    console.log(`Successfully captured the order number ${orderNumber} on the Order Received page.`);

    // Navigate to My Orders
    await navigationBar.navigateToMyAccount();
    await navigationBar.navigateToOrders();
    console.log("Successfully navigated to the Orders page.");

    // Validate the order exists in My Orders
    const ordersPage = new OrdersPage(loggedInPage);
    const latestOrderNumber = await ordersPage.getLatestOrderNumber();
    expect(latestOrderNumber).toBe(orderNumber); //`Order numbers do not match: Order Received (${orderNumber}) and My Orders (${latestOrderNumber}).`);
    console.log(`The order number given at Order Received matches with My Orders: ${latestOrderNumber}.`);
});


// test.afterEach(async ({ page, context}, testInfo) => {
//     if (testInfo.status !== testInfo.expectedStatus) {
//         // Get a unique place for the screenshot.
//         const screenshotPath = testInfo.outputPath(`pointOfFailure.png`);
//         // Take the screenshot itself.
//         const screenshot = await page.screenshot({ path: screenshotPath, timeout: 5000 });
//         // Add it to the report.
//         testInfo.attachments.push({ name: 'screenshot at failure', path: screenshotPath, contentType: 'image/png' });
//         console.log("An error has occured and a screenshot has been taken.");
//     }

//     const navigationBar = new NavigationBar(page);
//     await navigationBar.navigateToMyAccount();
//     await navigationBar.logout();
//     console.log("Successfully logged out.");

//     if (context) {
//         await context.close();
//     }

// });
