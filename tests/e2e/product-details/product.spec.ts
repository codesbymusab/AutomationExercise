import { test } from "../../../fixtures/product.fixture"
import { testProductList } from "../../../utils/data_generator";


test.describe('Product Details Page', () => {

    for (const product of testProductList) {
        test(`Verify product information for "${product.name}" (ID ${product.id})`, async ({ productPage }) => {
            await productPage.goto(product.id);
            await productPage.expectProductInformation(product);
        });
    }

    test('Verify adding a product to the cart', async ({ productPage }) => {
        const product = testProductList[0]; 

        await productPage.goto(product.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();

    })

    test('Verify product cannot be added to cart with empty quantity', async ({ productPage }) => {
        const qty = '';
        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.fillQuantity(qty);
        await productPage.expectQuantityValue(qty);      

    })

     test('Verify that quantity can not be set to a negative value', async ({ productPage }) => {
        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.fillQuantity(-1);
        await productPage.addToCart();
        await productPage.expectConfirmationMessageNotVisible();


    })
     test('Verify that the quantity can not be 0', async ({ productPage }) => {
        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.fillQuantity(0);
        await productPage.addToCart();
        await productPage.expectConfirmationMessageNotVisible();

    })
 
    


    test('Verify confimation model shows view cart and continue shopping buttons', async ({ productPage }) => {
        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.addToCart();
        await productPage.expectConfirmationModelButtons();
    })


    test('Verify confimation model  continue shopping button hides model', async ({ productPage }) => {
        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.expectContinueShoppingButtonHidesModel();
     
    })


    test('Verify confimation model view cart button navigates to cart page', async ({ productPage }) => {
        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.addToCart();
        await productPage.expectConfirmationMessage();
        await productPage.expectViewCartButtonNavigatesToCartPage();
     
    })

    test('Verify review is correctly submitted for the product', async ({ productPage }) => {

        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.fillReviewForm('John Doe', 'john.doe@example.com', 'This is a great product!');
        await productPage.submitReviewForm();

    })


    test('Verify review cannot be added with empty email field', async ({ productPage }) => {

        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.fillReviewForm('John Doe', '', 'This is a great product!');
        await productPage.expectEmailValidationMessage(/fill|Fill/);    

    })


     test('Verify review cannot be added with email without domain', async ({ productPage }) => {
    
            await productPage.goto();
    
            await productPage.fillReviewForm('John Doe', 'assafsa', 'This is a great product!');
    
            await productPage.expectEmailValidationMessage(/@|invalid|incorrect|email/);
    
    
        })
    
    
    
    
    
        test('Verify review cannot be added with email having special characters', async ({ productPage }) => {
    
            await productPage.goto();
    
            await productPage.fillReviewForm('John Doe', 'assaf1..1sa@gmail.com', 'This is a great product!');
    
            await productPage.expectEmailValidationMessage(/special characters/);
    
    
    })

    test('Verify review cannot be added with empty review field', async ({ productPage }) => {

        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.fillReviewForm('John Doe', 'john.doe@example.com', '');
        await productPage.expectReviewValidationMessage(/fill|Fill/);    

    })



    test('Verify review cannot be added with empty name field', async ({ productPage }) => {

        const product = testProductList[0]; 
        await productPage.goto(product.id);
        await productPage.fillReviewForm('', 'john.doe@example.com', 'This is a great product!');
        await productPage.expectNameValidationMessage(/fill|Fill/);    

    })

})