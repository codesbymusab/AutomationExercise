import { expect,test } from '../../../fixtures/auth.fixture';
import { generateRandomEmail } from '../../../utils/data_generator';

const EMAIL = generateRandomEmail();

test.describe('Account Deletion Tests', () => {

    test('Verify user account is succesfully deleted', async ({ signupPage, page }) => {


        await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab',EMAIL);

        await signupPage.fillSignupForm();

        await signupPage.submitSignup();

        await expect(signupPage.page).not.toHaveURL(`${process.env.BASE_URL}/signup`);

        await signupPage.expectAccountCreated();

        await page.goto(`${process.env.BASE_URL}`);

        await signupPage.deleteAccountButton.click();

        await expect(page.getByText('Account Deleted!')).toBeVisible();

        await expect(page.getByRole('listitem').filter({ hasText: 'Logged in as Muhammad' })).not.toBeVisible();

    })

    test('Verify user can not login successfully with deleted account', async ({ loginPage }) => {

        await loginPage.goto();

        await loginPage.login(EMAIL, `${process.env.VALID_PASSWORD}`);

        await loginPage.expectLoginValidationMessage(/invalid!|incorrect!/);



    })
})

