import { expect, Locator, Page } from "@playwright/test";



export class CartPage {
  readonly page: Page;
  readonly cart: Locator;
  readonly qauntityLocator: Locator;
  readonly priceLocator: Locator;
  readonly totalLocator: Locator;
  readonly productNameLocator: Locator;
  readonly emptyCartMessage: Locator;
  readonly removeButton: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly continueOnCartButton: Locator;
  readonly registerLoginLink: Locator;
  readonly loginFirstModal: Locator;


  constructor(page: Page) {
    this.page = page;
    this.cart = page.locator('#cart_info');
    this.emptyCartMessage = page.locator('#empty_cart');
    this.removeButton = page.locator('.cart_quantity_delete');
    this.qauntityLocator = page.locator('.cart_quantity');
    this.productNameLocator = page.locator('.cart_description').locator('a');
    this.priceLocator = page.locator('.cart_price');
    this.totalLocator = page.locator('.cart_total');
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
    this.continueOnCartButton = page.getByRole('button', { name: 'Continue On Cart' });
    this.registerLoginLink = page.getByRole('link', { name: 'Register / Login' });
    this.loginFirstModal = page.getByText(' Checkout Register / Login');



  }

  async goto() {
    await this.page.goto('https://automationexercise.com/view_cart');
  }



  async navigateToCart() {
    await this.page.goto(`${process.env.BASE_URL}`);
    await this.page.getByRole('link', { name: ' Cart' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}/view_cart`);
  }

  async removeItemFromCart(productName: string) {

    const cartItem = this.cart.getByRole('row', { name: new RegExp(`.*${productName}.*`, 'i') });
    await expect(cartItem).toBeVisible();
    await cartItem.locator(this.removeButton).first().click();
    await expect(cartItem).not.toBeVisible();

  }

  async expectItemInCart({ productName, quantity, price }: { productName: string; quantity: number; price: string }) {

    const cartItem = this.cart.getByRole('row', { name: new RegExp(`.*${productName}.*`, 'i') });
    await expect(cartItem).toBeVisible();
    await expect(cartItem.locator(this.qauntityLocator)).toHaveText(quantity.toString());
    await expect(cartItem.locator(this.priceLocator)).toHaveText(price);
    await expect(cartItem.locator(this.totalLocator)).toHaveText(`Rs. ${parseInt(price.replace('Rs. ', '')) * quantity}`);

  }

  async getCartItemCount() {
    const cartItems = this.cart.getByRole('row');
    return await cartItems.count();
  }

  async expectEmptyCartMessage() {
    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.emptyCartMessage).toContainText('Cart is empty!');
  }

  async proceedToCheckout() {

    await this.proceedToCheckoutButton.click();

  }

  async expectLoginFirstModalVisible() {
    await expect(this.loginFirstModal).toBeVisible();
  }

  async expectLoginFirstModalContinueButton() {
    await expect(this.loginFirstModal.locator(this.continueOnCartButton).click())
    await expect(this.loginFirstModal).not.toBeVisible();
  }

  async expectLoginFirstModalRegisterLoginButton() {
    await this.loginFirstModal.locator(this.registerLoginLink).click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.url()).toContain('/login');
  }

  async expectEmptyCartCheckout() {
    await this.emptyCart();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.emptyCartMessage).toContainText('Cart is empty!');
  }

  async expectCartPageUrl() {
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}/checkout`);
  }

  async getCartItemDetails() {


    const cartItems = this.cart.locator('tbody tr');

    const itemDetails = [];
    const count = await cartItems.count() - 1;
    for (let i = 0; i < count; i++) {
      const cartItem = cartItems.nth(i);
      const productName = await cartItem.locator(this.productNameLocator).textContent();
      const quantityText = await cartItem.locator(this.qauntityLocator).textContent();
      const price = await cartItem.locator(this.priceLocator).textContent();
      const quantity = parseInt(quantityText || '0', 10);
      itemDetails.push({ productName: productName?.trim() || '', quantity, price: price?.trim() || '' });
    }
    return itemDetails;
  }

  async emptyCart() {
    
    const cartItems = this.cart.locator('tbody tr');
    const cartItemCount = await cartItems.count() - 1;

    for (let i = 0; i < cartItemCount; i++) {
      const cartItem = cartItems.nth(0); 
      await expect(cartItem).toBeVisible();

      await cartItem.locator(this.removeButton).click();

      await expect(cartItem).not.toBeVisible();
    }

    const finalCartItemCount = await cartItems.count();
    expect(finalCartItemCount).toBe(0);
    
  }

}