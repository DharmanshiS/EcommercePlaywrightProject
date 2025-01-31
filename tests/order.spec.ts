import { test, expect } from './fixtures/fixtures';
import * as fs from 'fs';
import { CartPage } from './POM/CartPage';
import { CheckoutPage } from './POM/CheckoutPage';
import { OrderReceivedPage } from './POM/OrderReceivedPage';
import { OrdersPage } from './POM/OrdersPage';


//TEST CASE 2: check that the order has been placed successfully

test('Place an Order', async ({ loggedInNav }) => {

    console.log("\nTEST CASE 2\n");

    // Add a product to the cart
    const shopPage = await loggedInNav.navigateToShop();
    await shopPage.addProductToCart('Beanie');
    await shopPage.goToCart();

    // Proceed to checkout
    const cartPage = new CartPage(loggedInNav.page);
    await cartPage.checkout();
    console.log("Successfully pressed 'checkout'.");

    // Fill in the billing details
    const billingDetails = JSON.parse(fs.readFileSync('./tests/data/billing-details.json', 'utf-8'));
    console.log(`The details that are entered from the JSON file are: ${billingDetails}`);
    const checkoutPage = new CheckoutPage(loggedInNav.page);
    await checkoutPage.fillBillingDetails(billingDetails);
    console.log("Successfully filled in the billing details.");

    // Place the order
    await checkoutPage.placeOrder();
    console.log("Successfully placed the order.");

    // Capture the order number
    const orderReceivedPage = new OrderReceivedPage(loggedInNav.page);
    const orderNumber = await orderReceivedPage.getOrderNumber();
    console.log(`Successfully captured the order number ${orderNumber} on the Order Received page.`);

    // Navigate to My Orders
    await loggedInNav.navigateToMyAccount();
    await loggedInNav.navigateToOrders();
    console.log("Successfully navigated to the Orders page.");

    // Validate the order exists in My Orders
    const ordersPage = new OrdersPage(loggedInNav.page);
    const latestOrderNumber = await ordersPage.getLatestOrderNumber();
    expect(latestOrderNumber).toBe(orderNumber); //`Order numbers do not match: Order Received (${orderNumber}) and My Orders (${latestOrderNumber}).`);
    console.log(`The order number given at Order Received matches with My Orders: ${latestOrderNumber}.`);
});