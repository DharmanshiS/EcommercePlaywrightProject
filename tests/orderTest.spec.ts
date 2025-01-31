import { test, expect } from './fixtures/fixtures';
import * as fs from 'fs';

import { CartPage } from './POM/CartPage';
import { ShopPage } from './POM/ShopPage';
import { NavigationBar } from './POM/NavigationBar';
import { CheckoutPage } from './POM/CheckoutPage';
import { OrderReceivedPage } from './POM/OrderReceivedPage';
import { OrdersPage } from './POM/OrdersPage';


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