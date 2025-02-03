import { test, expect } from '../fixtures/fixtures';
import { CartPage } from '../pom/cart-page';
import { CheckoutPage } from '../pom/checkout-page';
import { OrderReceivedPage } from '../pom/order-received-page';
import { BillingDetails } from '../models/billing-details';
import * as fs from 'fs';

//TEST CASE 2: check that the order has been placed successfully

test('Place an Order', async ({ loggedInNav }) => {

    // Add a product to the cart
    const shopPage = await loggedInNav.navigateToShop();
    await shopPage.addProductToCart('Beanie');
    await shopPage.goToCart();

    // Proceed to checkout
    const cartPage = new CartPage(loggedInNav.page);
    await cartPage.checkout();

    // Fill in the billing details
    const billingdetails: BillingDetails = JSON.parse(fs.readFileSync('data/billing-details.json', 'utf-8'));
    
    const checkoutPage = new CheckoutPage(loggedInNav.page);
    await checkoutPage.fillBillingDetails(billingdetails.firstname, billingdetails.lastname, billingdetails.street, billingdetails.city, billingdetails.postcode, billingdetails.phone);

    // Place the order
    await checkoutPage.placeOrder();

    // Capture the order number
    const orderReceivedPage = new OrderReceivedPage(loggedInNav.page);
    const orderNumber = await orderReceivedPage.getOrderNumber();

    // Navigate to My Orders
    await loggedInNav.navigateToMyAccount();
    const ordersPage = await loggedInNav.navigateToOrders(); 

    // Validate the order exists in My Orders
    const latestOrderNumber = await ordersPage.getLatestOrderNumber();
    expect(latestOrderNumber, `The order number given at Order Received (${orderNumber}) does not match with My Orders (${latestOrderNumber}).`).toBe(orderNumber); 
});