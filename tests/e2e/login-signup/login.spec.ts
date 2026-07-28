
import { expect,test } from '../../../fixtures/auth.fixture';


test.describe('Login Tests', () => {


    test('Verify user can successfully login with valid email and valid password', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login(`${process.env.VALID_USERNAME}`, `${process.env.VALID_PASSWORD}`);

        await expect(loginPage.page).not.toHaveURL(`${process.env.BASE_URL}/login`, { timeout: 5000 });

    })


    test('Verify user login fails  for email case mismatch with valid email and valid password', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login(`${process.env.VALID_USERNAME!.charAt(0).toUpperCase()}${process.env.VALID_USERNAME!.slice(1)}`, `${process.env.VALID_PASSWORD}`);

        await loginPage.expectLoginValidationMessage(/invalid!|incorrect!/);


    })



    test('Verify user login fails with invalid email and invalid password', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login(`assafsa@gmail.com`, `${process.env.VALID_PASSWORD}/121.`);

        await loginPage.expectLoginValidationMessage(/invalid!|incorrect!/);


    })


    test('Verify login fails for an email without domain and valid password', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login(`assafsa`, `${process.env.VALID_PASSWORD}/121.`);

        await loginPage.expectEmailValidationMessage(/@|invalid|incorrect|email/);


    })




    test('Verify login fails for an email with special characters and valid password', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login(`assaf1..1sa@gmail.com`, `${process.env.VALID_PASSWORD}/121.`);

        await loginPage.expectEmailValidationMessage(/special characters/);


    })



    test('Verify login fails for an email without a username and valid password', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login(`@gmail.com`, `${process.env.VALID_PASSWORD}/121.`);

        await loginPage.expectEmailValidationMessage(/incomplete|email|invalid|incorrect/);



    })



    test('Verify login fails for  empty email field and valid filled password', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login('', `${process.env.VALID_PASSWORD}`);

        await loginPage.expectEmailValidationMessage(/fill|Fill/);
        

    })




    test('Verify login fails for  valid filled email and empty password field', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login(`${process.env.VALID_USERNAME}`, '');

        await loginPage.expectPasswordValidationMessage(/fill|Fill/);

    })


    test('Verify login fails for  empty email field and empty password field', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login('', '');

        await loginPage.expectEmailValidationMessage(/fill|Fill/);
        await loginPage.expectPasswordValidationMessage(/fill|Fill/);

    })

})



