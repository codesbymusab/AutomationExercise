import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../types/product";
import { escapeRegex } from "../utils/helpers";

export class ProductPage {

    readonly page: Page;
    readonly productInformation: Locator;
    readonly productImage: Locator;
    readonly addToCartButton: Locator;
    readonly quantityInput: Locator;
    readonly confirmationMessage: Locator;
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator
    readonly reviewInput: Locator;
    readonly reviewSubmitButton: Locator;
    readonly reviewSuccessMessage: Locator;


    constructor(page: Page) {

        this.page = page;
        this.productInformation = page.locator('.product-information');
        this.productImage = page.getByRole('img', { name: 'ecommerce website products' }).first();
        this.addToCartButton = page.getByRole('button', { name: ' Add to cart' });
        this.quantityInput = page.locator('#quantity');
        this.confirmationMessage = page.getByText(' Added! Your product has');
        this.reviewNameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.reviewEmailInput = page.getByRole('textbox', { name: 'Email Address', exact: true });
        this.reviewInput = page.getByRole('textbox', { name: 'Add Review Here!' });
        this.reviewSubmitButton = page.getByRole('button', { name: 'Submit' });
        this.reviewSuccessMessage = page.locator('.alert-success').first();

    }

    async goto(productId: number = 1) {
        await this.page.goto(`${process.env.BASE_URL}/product_details/${productId}`);
    }


    async expectProductInformation(product: Product) {

        await expect(this.productInformation.getByRole('heading', { name: product.name })).toBeVisible();

        await expect(
            this.productInformation.locator('p', { hasText: 'Category:' })
        ).toContainText(product.category.category);

        await expect(this.productImage).toBeVisible();

        await expect(this.productInformation.getByText('Rs.')).toHaveText(new RegExp(escapeRegex(product.price), 'i'))

        await expect(this.productInformation.getByText('Availability: In Stock')).toBeVisible();

        await expect(this.productInformation.getByText(new RegExp(`Brand: .*${escapeRegex(product.brand)}`, 'i'))).toBeVisible();

    }

    async addToCart() {

        await this.addToCartButton.click();

    }

    async fillQuantity(quantity: number | string) {

        await this.quantityInput.fill(quantity.toString());

    }

    async expectQuantityValue(expectedValue: number | string) {
        const actualValue = await this.quantityInput.inputValue();
        expect(actualValue).toBe(expectedValue.toString());


    }

    async expectConfirmationMessage() {
        await expect(this.confirmationMessage).toBeVisible();
    }

    async closeConfirmationMessage() {
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
        await expect(this.confirmationMessage).not.toBeVisible();
    }

    async expectConfirmationMessageNotVisible() {
        await expect(this.confirmationMessage).not.toBeVisible();
    }

    async expectConfirmationModelButtons() {
        await expect(this.confirmationMessage).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();

    }

    async expectContinueShoppingButtonHidesModel() {
        await expect(this.confirmationMessage).toBeVisible();
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
        await expect(this.confirmationMessage).not.toBeVisible();
    }

    async expectViewCartButtonNavigatesToCartPage() {
        await expect(this.confirmationMessage).toBeVisible();
        await this.page.getByRole('link', { name: 'View Cart' }).click();
        await expect(this.page).toHaveURL(new RegExp(escapeRegex('/view_cart'), 'i'));
    }

    async fillReviewForm(name: string, email: string, review: string) {

        await this.reviewNameInput.fill(name);
        await this.reviewEmailInput.fill(email);
        await this.reviewInput.fill(review);
        


    }

    async submitReviewForm() {

        await this.reviewSubmitButton.click();
        expect(this.reviewSuccessMessage).toBeVisible();

    }

    async expectNameValidationMessage(message: RegExp) {

        const validationMessage = await this.reviewNameInput.evaluate(
            el => (el as HTMLInputElement).validationMessage
        );

        expect(validationMessage).toMatch(message);

    }
    async expectEmailValidationMessage(message: RegExp) {

        const validationMessage = await this.reviewEmailInput.evaluate(
            el => (el as HTMLInputElement).validationMessage
        );

        expect(validationMessage).toMatch(message);

    }
    async expectReviewValidationMessage(message: RegExp) {

        const validationMessage = await this.reviewInput.evaluate(
            el => (el as HTMLInputElement).validationMessage
        );

        expect(validationMessage).toMatch(message);

    }
}