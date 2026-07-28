import { test } from "../../../fixtures/cart.fixture";
import { testPaymentDetails, testProductList } from "../../../utils/data_generator";


test.describe('Checkout - Payment Details', () => {

    const { name, cardNumber, expiryMonth, expiryYear, cvv } = testPaymentDetails

    test.beforeEach(async ({ cartPage }) => {


        await cartPage.goto();

    

    })

    test('Verify user can place order with valid payment details', async ({ paymentPage }) => {

        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name, cardNumber, expiryMonth, expiryYear, cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectOrderConfirmation();
    })

    test('Verify user can not place order with empty card holder name', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails('', cardNumber, expiryMonth, expiryYear, cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.nameOnCardInput, /fill|Fill/);
    })

    test('Verify user can not place order with empty card number', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name,'', expiryMonth, expiryYear, cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.cardNumberInput, /fill|Fill/);
    })

    test('Verify user can not place order with empty expiration month', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name, cardNumber,'', expiryYear, cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.expirationMonthInput, /fill|Fill/);
    })
    test('Verify user can not place order with empty expiration year', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name, cardNumber, expiryMonth, '', cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.expirationYearInput, /fill|Fill/);
    })

    test('Verify user can not place order with empty cvv', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name , cardNumber, expiryMonth, expiryYear, '');
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.cvvInput, /fill|Fill/);
    })

    test('Verify user can not place order with invalid card number', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name, '1aa12das1', expiryMonth, expiryYear, cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.cardNumberInput, /invalid|Invalid/);
    })

    test('Verify user can not place order with invalid cvv', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name, cardNumber, expiryMonth, expiryYear, '1x1');
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.cvvInput, /invalid|Invalid/);
    })

    test('Verify user can not place order with invalid card holder name', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails('11121doe', cardNumber, expiryMonth, expiryYear, cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.cvvInput, /invalid|Invalid/);
    })

    test('Verify user can not place order with invalid expiry month', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name, cardNumber,'14', expiryYear, cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.cvvInput, /invalid|Invalid/);
    })

    test('Verify user can not place order with invalid expiry year', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name, cardNumber, expiryMonth, '2k6', cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.cvvInput, /invalid|Invalid/);
    })

    test('Verify user can not place order with expired card', async ({ paymentPage }) => {
        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name, cardNumber, expiryMonth, '1999', cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectValidationMessage(paymentPage.cvvInput, /invalid|Invalid/);
    })

    test('Verify user can download order invoice after payment',async ({paymentPage})=>{

        await paymentPage.goto();
        await paymentPage.placeOrder();
        await paymentPage.fillPaymentDetails(name, cardNumber, expiryMonth, expiryYear, cvv);
        await paymentPage.payAndConfirmOrder();
        await paymentPage.expectOrderConfirmation();
        await paymentPage.expectDownloadInvoice()

    })

})