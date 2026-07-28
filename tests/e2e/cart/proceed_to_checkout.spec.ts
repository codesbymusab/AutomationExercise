import { test } from "../../../fixtures/cart.fixture";
import { testProductList } from "../../../utils/data_generator";


// test.describe('Checkout - Logged In User', () => {


//     test.beforeEach(async ({ cartPage }) => {


//         await cartPage.goto();


//     })

//     test('Verify that logged in user can proceed to checkout from his cart', async ({ cartPage }) => {



//         await cartPage.proceedToCheckout();
//         await cartPage.expectCartPageUrl();

//     });



// })

// test.describe('Checkout - Logged Out User', () => {

//     test.use({ storageState: { cookies: [], origins: [] } }); 

//     test.beforeEach(async ({ cartPage,loginPage }) => {

//         await cartPage.goto();

//     })

//     test('Verify logged out user can not proceed to checkout without login', async ({ cartPage, productPage, loginPage }) => {

//         await cartPage.proceedToCheckout();
//         await cartPage.expectLoginFirstModalVisible();

//     })

//     test('Verify user can continue shopping from checkout page login first modal', async ({ cartPage }) => {

//         await cartPage.proceedToCheckout();
//         await cartPage.expectLoginFirstModalContinueButton();
//     })

//     test('Verify user can go to login page from checkout page login first modal', async ({ cartPage }) => {

//         await cartPage.proceedToCheckout();
//         await cartPage.expectLoginFirstModalRegisterLoginButton();

//     })

// })

test.describe('Checkout - Empty Cart', () => {

    
    test.use({ storageState: { cookies: [], origins: [] } }); 


    test('Verify user can not proceed to checkout with empty cart', async ({ emptyCartPage }) => {
        
        await emptyCartPage.goto();
        await emptyCartPage.expectEmptyCartCheckout();

    })
})