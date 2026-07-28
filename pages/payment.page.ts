import { Page, Locator, expect } from '@playwright/test';

export class PaymentPage {

    readonly page: Page

    readonly placeOrderButton: Locator;
    readonly nameOnCardInput: Locator;
    readonly cardNumberInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;
    readonly cvvInput: Locator;
    readonly payAndConfirmOrderButton: Locator;
    readonly orderPlacedMessage: Locator;
    readonly downloadInvoiceLink: Locator;
    readonly continueButton: Locator;
    readonly deliveryAddress: Locator;
    readonly billingAddress: Locator;
    readonly addressDelivery: Locator;
    readonly proceedToCheckoutButton: Locator;


    constructor(page: Page) {

        this.page = page;

        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
        this.nameOnCardInput = page.locator('input[name="name_on_card"]');
        this.cardNumberInput = page.locator('input[name="card_number"]');
        this.cvvInput = page.getByRole('textbox', { name: 'ex.' });
        this.expirationMonthInput = page.getByRole('textbox', { name: 'MM' });
        this.expirationYearInput = page.getByRole('textbox', { name: 'YYYY' });
        this.payAndConfirmOrderButton = page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.orderPlacedMessage = page.getByText('Order Placed!');
        this.downloadInvoiceLink = page.getByRole('link', { name: 'Download Invoice' });
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');



        this.billingAddress = page.getByText('Your billing address Mr.');
        this.deliveryAddress = page.getByText('Your delivery address Mr.');
        this.addressDelivery = page.locator('#address_delivery');

    }

    async goto() {

        await this.page.goto(`${process.env.BASE_URL}/view_cart`);
        await this.page.waitForLoadState('domcontentloaded');
        await this.proceedToCheckoutButton.click();


    }


    async placeOrder() {

        await this.placeOrderButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        expect(this.page.url()).toContain('/payment');

    }

    async fillPaymentDetails(nameOnCard: string, cardNumber: string, expiryMonth: string, expiryYear: string, cvv: string) {

        await this.nameOnCardInput.fill(nameOnCard);
        await this.cardNumberInput.fill(cardNumber);
        await this.expirationMonthInput.fill(expiryMonth);
        await this.expirationYearInput.fill(expiryYear);
        await this.cvvInput.fill(cvv);

    }

    async payAndConfirmOrder() {

        await this.payAndConfirmOrderButton.click();




    }

    async expectOrderConfirmation() {

        await expect(this.page.url()).toContain('/payment_done');
        await expect(this.orderPlacedMessage).toBeVisible();

    }


    async expectValidationMessage(locator: Locator, regex: RegExp) {
        const validationMessage = await locator.evaluate(el => (el as HTMLInputElement).validationMessage);
        expect(validationMessage).toMatch(regex);
    }

    async expectDownloadInvoice() {

        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadInvoiceLink.click();

        const download = await downloadPromise;

        const suggestedFilename = download.suggestedFilename();
        expect(suggestedFilename).toContain('invoice');



    }


}