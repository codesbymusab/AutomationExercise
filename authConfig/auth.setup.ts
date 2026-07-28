import { expect, test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  
    await page.goto(`${process.env.BASE_URL}/login`);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.VALID_PASSWORD);
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(process.env.VALID_USERNAME);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).not.toHaveURL(`${process.env.BASE_URL}/login`, { timeout: 5000 });

    
    await page.context().storageState({ path: 'auth/user.json' });
    
})