import { expect, Locator, Page } from "@playwright/test";


export class LoginPage {

    readonly page: Page;
    readonly passwordInputSelector: Locator;
    readonly emailInputSelector: Locator;
    readonly loginButtonSelector: Locator;
    readonly loginValidationMessageSelector: Locator;
    readonly logoutButtonSelector: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginValidationMessageSelector = this.page.getByText(/Your email or password is (invalid|incorrect)!?/);

        this.passwordInputSelector = page.getByRole('textbox', { name: 'Password' })
        this.emailInputSelector = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
        this.loginButtonSelector = page.getByRole('button', { name: 'Login' });
        this.logoutButtonSelector = page.getByRole('link', { name: ' Logout' })
    }


    async fillEmail(email: string) {
        await this.emailInputSelector.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInputSelector.fill(password);
    }

    async clickLoginButton() {
        await this.loginButtonSelector.click();
    }

    async login(email = '', password = '') {

        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.loginButtonSelector.click();
          

    }

    async expectEmailValidationMessage(message: RegExp) {

        const validationMessage = await this.emailInputSelector.evaluate(
            el => (el as HTMLInputElement).validationMessage
        );

        expect(validationMessage).toMatch(message);

    }

    async expectPasswordValidationMessage(message: RegExp) {

        const validationMessage = await this.passwordInputSelector.evaluate(
            el => (el as HTMLInputElement).validationMessage
        );

        expect(validationMessage).toMatch(message);

    }


    async expectLoginValidationMessage(message: RegExp) {
        
        await expect(this.loginValidationMessageSelector).toBeVisible({ timeout: 10000 });
        const text = await this.loginValidationMessageSelector.textContent();
        expect(text).toMatch(message);

    }

    async goto() {

        await this.page.goto(`${process.env.BASE_URL}/login`);
    }


    async logout() {
        
        await this.logoutButtonSelector.click();
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/login`, { timeout: 10000 }); 
    }
}