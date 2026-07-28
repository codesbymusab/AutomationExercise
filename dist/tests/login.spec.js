"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("playwright/test");
test_1.test.describe('Login Tests', () => {
    (0, test_1.test)('should login successfully with valid credentials', async ({ page }) => {
        await page.goto(process.env.BASE_URL || 'https://the-ledger-sigma.vercel.app');
        await page.fill('#username', process.env.VALID_USERNAME || 'admin@test.com');
        await page.fill('#password', process.env.VALID_PASSWORD || 'Admin123!');
        await page.click('#loginButton');
        const dashboard = await page.waitForSelector('#dashboard');
        (0, test_1.expect)(dashboard).toBeTruthy();
    });
});
