
import { test as base } from '@playwright/test';
import { SearchPage } from '../pages/search.page';


type MyFixtures = {
  searchPage: SearchPage;
};
export const test = base.extend<MyFixtures>({
  searchPage: async ({ page }, use) => {
    const searchPageInstance = new SearchPage(page);
    await use(searchPageInstance);
  }
});


export { expect } from '@playwright/test';