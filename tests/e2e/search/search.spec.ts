import { expect, test } from "../../../fixtures/search.fixture";


test.describe('Search Functionality', () => {

    test('Verify products can be searched and results are displayed', async ({ searchPage }) => {

        await searchPage.goto();    
        await searchPage.searchProduct('top');
        await searchPage.verifySearchResults('top');

         
    })

    test('Verify all products are displayed when no search term is entered', async ({ searchPage }) => {

        await searchPage.goto();    
        await searchPage.searchProduct('');
        const resultsCount = await searchPage.getSearchResultsCount();
        const allProductsCount = await searchPage.getAllProdcutCount();
        expect(resultsCount).toBe(allProductsCount);
        

         
    })


    test('Verify no products are displayed when only whitespaces are entered', async ({ searchPage }) => {

        await searchPage.goto();    
        await searchPage.searchProduct('   ');
        const resultsCount = await searchPage.getSearchResultsCount();
        expect(resultsCount).toBe(0);
        

         
    })


    test('Verify search correctly handles special characters', async ({ searchPage }) => {

        await searchPage.goto();    
        await searchPage.searchProduct('!@#$%^&*()');
            
    })

    test('Verify search handles case sensitivity', async ({ searchPage }) => {

        await searchPage.goto();    
        await searchPage.searchProduct('top');
        const resultsCountLowerCase = await searchPage.getSearchResultsCount();
        await searchPage.searchProduct('TOP');
        const resultsCountUpperCase = await searchPage.getSearchResultsCount();
        expect(resultsCountLowerCase).toBe(resultsCountUpperCase);
         
    })


    

    
})