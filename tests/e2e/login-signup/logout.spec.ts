import { expect, test } from '../../../fixtures/auth.fixture';


test.describe('Logout Tests', () => {

    test('Verify user can successfully logout', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login(`${process.env.VALID_USERNAME}`, `${process.env.VALID_PASSWORD}`);

        await loginPage.logout();

        await expect(loginPage.page).toHaveURL(`${process.env.BASE_URL}/login`);

    })


    test('Verify user can not access protected pages after logout', async ({ loginPage }) => {

        await loginPage.goto()

        await loginPage.login(`${process.env.VALID_USERNAME}`, `${process.env.VALID_PASSWORD}`);
        
        await loginPage.logout();
            
        await expect(loginPage.page.getByRole('listitem').filter({ hasText: 'Logged in as Muhammad' })).not.toBeVisible();

    })


    test('Verify user can not go back to protected page using broswer back button after logout', async ({ loginPage, page }) => {

        await loginPage.goto();

        await loginPage.login(`${process.env.VALID_USERNAME}`, `${process.env.VALID_PASSWORD}`);

        await loginPage.logout();

        await page.goBack();

        await page.waitForLoadState('networkidle');

        await expect(page.getByRole('listitem').filter({ hasText: 'Logged in as Muhammad' })).not.toBeVisible();

    })

})