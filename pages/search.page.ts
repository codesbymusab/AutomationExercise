import { expect, Locator, Page } from '@playwright/test';
import { escapeRegex } from '../utils/helpers';

export class SearchPage {

    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResults: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('textbox', { name: 'Search Product' });
        this.searchButton = page.locator('#submit_search');
        this.searchResults = page.locator('.features_items');
    }

    async goto() {

        await this.page.goto(`${process.env.BASE_URL}/products`);
    }

    async searchProduct(productName: string) {

        await this.searchInput.fill(productName);
        await this.searchButton.click();

        await this.searchResults.waitFor({ state: 'visible' });

    }

    async getAllProdcutCount() {
        const productCards = this.searchResults.locator('.col-sm-4');
        return await productCards.count();
    }

    async getSearchResultsCount() {
        const productCards = this.searchResults.locator('.col-sm-4');
        return await productCards.count();
    }

    async verifySearchResults(productTerm: string) {
        const productCards = this.searchResults.locator('.col-sm-4');
        const count = await productCards.count();

        for (let i = 0; i < count; i++) {
            const card = productCards.nth(i);

            const cardText = await card.allTextContents();
            const nameMatches = cardText.some(t => new RegExp(escapeRegex(productTerm), 'i').test(t));

            if (nameMatches) {
                expect(nameMatches).toBeTruthy();
                continue;
            }
    
            await card.getByRole('link', { name: /View Product/i }).click();
            await this.page.waitForLoadState('domcontentloaded');

            await expect(
                this.page.getByText(new RegExp(escapeRegex(`Category: .*${productTerm}`), 'i'))
            ).toBeVisible();

            await this.page.goBack({timeout: 10000});
            await expect(this.searchResults).toBeVisible();
        }
    }

    

}