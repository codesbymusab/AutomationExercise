import { expect, test } from '../../../fixtures/auth.fixture';

import { generateRandomEmail } from '../../../utils/data_generator';

const EXISTING_EMAIL = 'muhammadmasab2005@gmail.com'


test.describe('Signup Tests', () => {

    test('Verify user can successfully signup with valid signup data', async ({ signupPage }) => {

        await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab', generateRandomEmail());

        await signupPage.fillSignupForm();

        await signupPage.submitSignup();

        await expect(signupPage.page).not.toHaveURL(`${process.env.BASE_URL}/signup`);

        await signupPage.expectAccountCreated();

    })


    test('Verify signup fails for a duplicate email ', async ({ signupPage }) => {

        await signupPage.goto();

        await signupPage.fillStartSignupForm('Muhammad Musab', EXISTING_EMAIL);
      
        await expect(signupPage.page.getByText('Email Address already exist!')).toBeVisible();

    })



    test('Verify signup fails for an invalid email', async ({ signupPage }) => {

        await signupPage.goto();

        await signupPage.fillStartSignupForm('Muhammad Musab', 'musab.com');

        const emailInput = signupPage.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')

        await signupPage.expectValidationMessage(emailInput, /@|email|invalid|incorrect/);


    })


    test('Verify signup fails for an empty name field', async ({ signupPage }) => {

        await signupPage.goto();

        await signupPage.fillStartSignupForm('', generateRandomEmail());

        await signupPage.page.getByRole('textbox', { name: 'Name' }).fill('');

        const nameInput = signupPage.page.getByRole('textbox', { name: 'Name' })

        await signupPage.expectValidationMessage(nameInput, /fill|Fill/);

    })

    test('Verify signup fails for an empty email field', async ({ signupPage }) => {

        await signupPage.goto();

        await signupPage.fillStartSignupForm('Muhammad Musab', '');

        const emailInput = signupPage.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')

        await signupPage.expectValidationMessage(emailInput, /fill|Fill/);



    })


    test('Verify First name is required.', async ({ signupPage }) => {


       await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab', generateRandomEmail());

        await signupPage.fillSignupForm({ FirstName: '' });

        await signupPage.submitSignup();


        const firstNameInput = signupPage.page.getByRole('textbox', { name: 'First name *' });
       
        await signupPage.expectValidationMessage(firstNameInput, /fill|Fill/);

    })
   

    test('Verify Last name is required.', async ({ signupPage }) => {

        
       await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab', generateRandomEmail());

        await signupPage.fillSignupForm({ LastName: '' });

        await signupPage.submitSignup();


        const lastNameInput = signupPage.page.getByRole('textbox', { name: 'Last name *' });
       
        await signupPage.expectValidationMessage(lastNameInput, /fill|Fill/);
    });

    test('Verify Address is required.', async ({ signupPage }) => {

        
       await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab', generateRandomEmail());

        await signupPage.fillSignupForm({ FirstName: '' });

        await signupPage.submitSignup();


        const addressInput = signupPage.page.getByRole('textbox', { name: 'Address * (Street address, P.' })
       
        await signupPage.expectValidationMessage(addressInput, /fill|Fill/);

       
    });

    test('Verify State is required.', async ({ signupPage }) => {

         
       await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab', generateRandomEmail());

        await signupPage.fillSignupForm({ State: '' });

        await signupPage.submitSignup();


        const stateInput = signupPage.page.getByRole('textbox', { name: 'State *' });
       
        await signupPage.expectValidationMessage(stateInput, /fill|Fill/);

        
    });

    test('Verify City is required.', async ({ signupPage }) => {

        await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab', generateRandomEmail());

        await signupPage.fillSignupForm({ CityZip: '' });

        await signupPage.submitSignup();


        const cityInput = signupPage.page.getByRole('textbox', { name: 'City * Zipcode *' })
       
        await signupPage.expectValidationMessage(cityInput, /fill|Fill/);

       
    });

    test('Verify Zipcode is required. (zipcode field)', async ({ signupPage }) => {

        await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab', generateRandomEmail());

        await signupPage.fillSignupForm({ Zipcode: '' });

        await signupPage.submitSignup();


        const zipcodeInput = signupPage.page.locator('#zipcode')
       
        await signupPage.expectValidationMessage(zipcodeInput, /fill|Fill/);

    });

 

    test('Verify Password is required.', async ({ signupPage }) => {

        await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab', generateRandomEmail());

        await signupPage.fillSignupForm({ Password: '' });

        await signupPage.submitSignup();


        const passwordInput = signupPage.page.getByRole('textbox', { name: 'Password *' });
       
        await signupPage.expectValidationMessage(passwordInput, /fill|Fill/);

    });


    test('Verify Mobile Number is required.', async ({ signupPage }) => {

        await signupPage.goto();

        await signupPage.startSignup('Muhammad Musab', generateRandomEmail());

        await signupPage.fillSignupForm({ Mobile: '' });

        await signupPage.submitSignup();


        const mobileInput = signupPage.page.getByRole('textbox', { name: 'Mobile Number *' });
       
        await signupPage.expectValidationMessage(mobileInput, /fill|Fill/);

    });




});


