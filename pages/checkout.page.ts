import { Page, Locator, expect } from '@playwright/test';
import { UserDetails } from '../types/product';

export class CheckoutPage {

    readonly page: Page
    readonly cart: Locator;
    readonly productQuantityLocator: Locator;
    readonly productPriceLocator: Locator;
    readonly productTotalLocator: Locator;
    readonly cartTotalLocator: Locator;
    readonly placeOrderButton: Locator;
    readonly deliveryAddress: Locator;
    readonly billingAddress: Locator;
    readonly addressDelivery: Locator;
    readonly proceedToCheckoutButton: Locator;


    constructor(page: Page) {

        this.page = page;

        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
       
        this.cart = page.locator('#cart_info');
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
        this.productQuantityLocator = page.locator('.cart_quantity');
        this.productPriceLocator = page.locator('.cart_price');
        this.productTotalLocator = page.locator('.cart_total');
        this.cartTotalLocator = page.getByRole('row', { name: 'Total Amount Rs.' }).getByRole('paragraph');

       

        this.billingAddress = page.getByText('Your billing address Mr.');
        this.deliveryAddress = page.getByText('Your delivery address Mr.');
        this.addressDelivery = page.locator('#address_delivery');

    }

    async goto() {

        await this.page.goto(`${process.env.BASE_URL}/view_cart`);
        await this.proceedToCheckoutButton.click();
        await this.page.waitForLoadState('domcontentloaded');

    }

    async verifyBillingUserDetails(testUserDetails: UserDetails) {

     
        await expect(this.billingAddress).toBeVisible();
        await expect(this.billingAddress).toContainText(testUserDetails.FirstName);
        await expect(this.billingAddress).toContainText(testUserDetails.LastName);
        await expect(this.billingAddress).toContainText(testUserDetails.Address);
        await expect(this.billingAddress).toContainText(testUserDetails.CityZip);
        await expect(this.billingAddress).toContainText(testUserDetails.State);
        await expect(this.billingAddress).toContainText(testUserDetails.Country);
        await expect(this.billingAddress).toContainText(testUserDetails.Zipcode);
        await expect(this.billingAddress).toContainText(testUserDetails.Mobile);


    }

    async verifyDeliveryUserDetails(testUserDetails: UserDetails) {

        
        await expect(this.deliveryAddress).toBeVisible();
        await expect(this.deliveryAddress).toContainText(testUserDetails.FirstName);
        await expect(this.deliveryAddress).toContainText(testUserDetails.LastName);
        await expect(this.deliveryAddress).toContainText(testUserDetails.Address);
        await expect(this.deliveryAddress).toContainText(testUserDetails.CityZip);
        await expect(this.deliveryAddress).toContainText(testUserDetails.State);
        await expect(this.deliveryAddress).toContainText(testUserDetails.Country);
        await expect(this.deliveryAddress).toContainText(testUserDetails.Zipcode);
        await expect(this.deliveryAddress).toContainText(testUserDetails.Mobile);
    }


    async expectItemDetails(cartItems: { productName: string; quantity: number; price: string }[]) {

        for (const { productName, quantity, price } of cartItems) {

            const cartItem = this.cart.getByRole('row', { name: new RegExp(`.*${productName}.*`, 'i') });

            await expect(cartItem).toBeVisible();
            await expect(cartItem.locator(this.productQuantityLocator)).toHaveText(quantity.toString());
            await expect(cartItem.locator(this.productPriceLocator)).toHaveText(price);
            await expect(cartItem.locator(this.productTotalLocator)).toHaveText(`Rs. ${parseInt(price.replace('Rs. ', '')) * quantity}`);

        }
    }


    async expectCartTotal() {


        const cartItems = this.cart.locator('tbody tr');
        const cartItemCount = await cartItems.count() - 1;
    
        let expectedTotal = 0;
        
        for (let i = 0; i < cartItemCount; i++) {
            const cartItem = cartItems.nth(0);

            const priceText = await cartItem.locator(this.productPriceLocator).textContent();
            const quantityText = await cartItem.locator(this.productQuantityLocator).textContent();
            console.log(`Price: ${priceText}, Quantity: ${quantityText}`);
            const price = parseInt(priceText?.replace('Rs. ', '') || '0', 10);
            const quantity = parseInt(quantityText || '0', 10);
            expectedTotal += price * quantity;
        }

        await expect(this.cartTotalLocator).toContainText(expectedTotal.toString());
    }

   

}