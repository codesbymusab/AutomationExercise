import { expect, test } from "../../../fixtures/cart.fixture";
import { testProductList } from "../../../utils/data_generator";



test.describe('Cart Page Tests', () => {

    test('Verify that the cart page is accessible via the cart link', async ({emptyCartPage }) => {
        await emptyCartPage.navigateToCart();
    })

    test('Verify that item is added to cart from product page', async ({ emptyCartPage,productPage }) => {
        
        const product= testProductList[0];
        await productPage.goto(product.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.closeConfirmationMessage();
        await emptyCartPage.navigateToCart();
        await emptyCartPage.expectItemInCart({ productName: product.name, quantity: 1, price: product.price });
        
    })

    test('Verify that item can be removed from cart', async ({ emptyCartPage,productPage }) => {
        const product= testProductList[0];
        await productPage.goto(product.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.closeConfirmationMessage();
        await emptyCartPage.navigateToCart();
        await emptyCartPage.expectItemInCart({ productName: product.name, quantity: 1, price: product.price });
        await emptyCartPage.removeItemFromCart(product.name);
        await expect(emptyCartPage.getCartItemCount()).resolves.toBe(0);
    })

      test('Verify removing one product does not affect other products in the cart', async ({ emptyCartPage,productPage }) => {
        const productA= testProductList[0];
        const productB= testProductList[1];
        
        await productPage.goto(productA.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.closeConfirmationMessage();

        await productPage.goto(productB.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.closeConfirmationMessage();
        
        await emptyCartPage.goto();

        const cartItemCount = await emptyCartPage.getCartItemCount();

        await emptyCartPage.removeItemFromCart(productA.name);

        await expect(emptyCartPage.getCartItemCount()).resolves.toBe(cartItemCount - 1);
    })

    test('Verify that the cart page displays correct total for multiple quantities of a product', async ({ emptyCartPage,productPage }) => {
        const product= testProductList[0];
        const quantity = 3; 
    
        await productPage.goto(product.id);
        await productPage.fillQuantity(quantity);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.closeConfirmationMessage();

        await emptyCartPage.goto();

        await emptyCartPage.expectItemInCart({ productName: product.name, quantity: quantity, price: product.price });
    })

    test('Verify cart displays correct empty state message when no items are in the cart', async ({ emptyCartPage }) => {
        
        await emptyCartPage.goto();
        await emptyCartPage.expectEmptyCartMessage();
        
    })


    test('Verify adding duplicate product increases quanity only', async ({ emptyCartPage, productPage }) => {

        const product= testProductList[0];
        await productPage.goto(product.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.closeConfirmationMessage();

        await emptyCartPage.goto();
        await emptyCartPage.expectItemInCart({ productName: product.name, quantity: 1, price: product.price });
        const initialCartItemCount = await emptyCartPage.getCartItemCount();

        await productPage.goto(product.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.closeConfirmationMessage();

        await emptyCartPage.goto();
        await emptyCartPage.expectItemInCart({ productName: product.name, quantity: 2, price: product.price });
        const updatedCartItemCount = await emptyCartPage.getCartItemCount();

        await expect(updatedCartItemCount).toBe(initialCartItemCount);


    })

    test.use({ storageState: { cookies: [], origins: [] } });

    test('Verify logged in user cart persists after logout and login', async ({ emptyCartPage, productPage, loginPage }) => {

        const product= testProductList[0];
        
        
        await loginPage.goto();
        await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

        await productPage.goto(product.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.closeConfirmationMessage();   

        await emptyCartPage.goto();
        await emptyCartPage.expectItemInCart({ productName: product.name, quantity: 1, price: product.price });

        await loginPage.logout();

        await loginPage.goto();
        await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

        await emptyCartPage.goto();
        await emptyCartPage.expectItemInCart({ productName: product.name, quantity: 1, price: product.price });


    })

})