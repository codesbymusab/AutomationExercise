import { test } from "../../../fixtures/cart.fixture";
import { testProductList, testUserProfile } from "../../../utils/data_generator";

test.describe('Checkout Page', () => {

    test('Verify user billing details on checkout match user profile', async ({ checkoutPage }) => {
        await checkoutPage.goto();
        await checkoutPage.verifyBillingUserDetails(testUserProfile);
    })

    test('Verify user delivery details on checkout match user profile', async ({ checkoutPage }) => {
        await checkoutPage.goto();
        await checkoutPage.verifyDeliveryUserDetails(testUserProfile);
    })

    test('Verify item details on checkout match cart items', async ({ checkoutPage, cartPage }) => {
        const cartItems = await cartPage.getCartItemDetails();
        await checkoutPage.goto();
        await checkoutPage.expectItemDetails(cartItems);
    })

    test('Verify cart total on checkout matches sum of item totals', async ({ checkoutPage }) => {
        await checkoutPage.goto();
        await checkoutPage.expectCartTotal();
    })

});