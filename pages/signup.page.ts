import { expect, Locator, Page } from '@playwright/test';

export class SignupPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedText: Locator;
    readonly deleteAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.emailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
        this.accountCreatedText = page.getByText('ACCOUNT CREATED');
        this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' })
    }

    async goto() {
        await this.page.goto(`${process.env.BASE_URL}/login`);
    }

    async startSignup(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/signup`);
    }

    async fillStartSignupForm(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();

    }

    async fillSignupForm(fields: { [key: string]: string } = {}) {
        // Default values
        const defaults: { [key: string]: string } = {
            Password: '12345678',
            FirstName: 'Muhammad',
            LastName: 'Musab',
            Address: 'Street 1, Street 2',
            Country: 'Canada',
            State: 'Ontario',
            CityZip: 'Toronto',
            Zipcode: 'M1B 2K3',
            Mobile: '+1 416-123-4567'
        };

        const data = { ...defaults, ...fields };


        await this.page.getByRole('textbox', { name: 'Password *' }).fill(data['Password']);
        await this.page.locator('#days').selectOption('11');
        await this.page.locator('#months').selectOption('1');
        await this.page.locator('#years').selectOption('2005');
        await this.page.getByRole('textbox', { name: 'First name *' }).fill(data['FirstName']);
        await this.page.getByRole('textbox', { name: 'Last name *' }).fill(data['LastName']);
        await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(data['Address']);
        await this.page.getByLabel('Country *').selectOption(data['Country']);
        await this.page.getByRole('textbox', { name: 'State *' }).fill(data['State']);
        await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(data['CityZip']);
        await this.page.locator('#zipcode').fill(data['Zipcode']);
        await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(data['Mobile']);
    }


    async submitSignup() {
        await this.createAccountButton.click();
    }

    async expectAccountCreated() {
        await expect(this.accountCreatedText).toBeVisible();
    }

    async expectValidationMessage(locator: Locator, regex: RegExp) {
        const validationMessage = await locator.evaluate(el => (el as HTMLInputElement).validationMessage);
        expect(validationMessage).toMatch(regex);
    }

    async deleteAccount() {

        await this.deleteAccountButton.click();

    }
}
