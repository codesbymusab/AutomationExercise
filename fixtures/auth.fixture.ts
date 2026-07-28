
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';


type MyFixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
};
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPageInstance = new LoginPage(page);  
    await use(loginPageInstance);                    
  },
  signupPage: async ({ page }, use) => {
    const signupPageInstance = new SignupPage(page);  
    await use(signupPageInstance);                    
  }
});


export { expect } from '@playwright/test';