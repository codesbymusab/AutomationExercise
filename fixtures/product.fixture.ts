
import { test as base } from '@playwright/test';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';



type MyFixtures = {
  productPage: ProductPage;
  cartPage: CartPage;
};
export const test = base.extend<MyFixtures>({
  productPage: async ({ page }, use) => {
    const searchPageInstance = new ProductPage(page);
    await use(searchPageInstance);
  }

});


export { expect } from '@playwright/test';