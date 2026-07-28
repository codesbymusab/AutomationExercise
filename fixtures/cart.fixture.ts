import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { ProductPage } from '../pages/product.page';
import { LoginPage } from '../pages/login.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PaymentPage } from '../pages/payment.page';
import { testProductList } from '../utils/data_generator';

type MyFixtures = {
    cartPage: CartPage;
    productPage: ProductPage;
    loginPage: LoginPage;
    checkoutPage: CheckoutPage;
    emptyCartPage: CartPage;
    paymentPage: PaymentPage;
};
export const test = base.extend<MyFixtures>({

    productPage: async ({ page }, use) => {
        const searchPageInstance = new ProductPage(page);
        await use(searchPageInstance);
    },

    emptyCartPage: async ({ page }, use) => {
        const cartPageInstance = new CartPage(page);
        await cartPageInstance.goto();
        await use(cartPageInstance);

    },
    cartPage: async ({ page, productPage }, use) => {
        const cartPageInstance = new CartPage(page);
        await cartPageInstance.goto();
        const count = await cartPageInstance.getCartItemCount();

        if (count === 0) {
            const product = testProductList[0];
            await productPage.goto(product.id);
            await productPage.addToCart();
            await productPage.expectConfirmationMessage();
            await productPage.closeConfirmationMessage();
            await cartPageInstance.goto();
        }

        await use(cartPageInstance);
    },


    loginPage: async ({ page }, use) => {
        const loginPageInstance = new LoginPage(page);
        await use(loginPageInstance);
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPageInstance = new CheckoutPage(page);
        await use(checkoutPageInstance);
    }
    ,
    paymentPage: async ({ page }, use) => {
        const paymentPageInstance = new PaymentPage(page);
        await use(paymentPageInstance);
    }
});


export { expect } from '@playwright/test';