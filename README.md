# AutomationExercise — Playwright Test Automation

End-to-end test automation suite for [automationexercise.com](https://automationexercise.com), covering the core e-commerce user journey: **Registration → Login → Product Search → Product Details → Cart → Checkout → Order Confirmation**.

Built with [Playwright](https://playwright.dev/) and TypeScript, using the Page Object Model (POM) pattern and custom fixtures for setup and state reuse.

---

## Tech Stack

- **Playwright** (`@playwright/test`) — test runner and browser automation
- **TypeScript** — type-safe test and page object code
- **dotenv** — environment-based configuration

---

## Project Structure

```
AutomationExercise/
├── authConfig/
│   └── auth.setup.ts          # logs in once, saves session to auth/user.json
├── auth/
│   └── user.json              # generated storage state (gitignored)
├── tests/
│   └── e2e/
│       ├── login-signup/
│       │   ├── signup.spec.ts
│       │   └── login.spec.ts
│       ├── search/
│       │   └── search.spec.ts
│       ├── product-details/
│       │   └── product-details.spec.ts
│       ├── cart/
│       │   └── cart.spec.ts
│       ├── checkout/
│       │   └── checkout.spec.ts
│       └── payment/
│           └── payment.spec.ts
├── pages/
│   ├── login.page.ts
│   ├── signup.page.ts
│   ├── search.page.ts
│   ├── product.page.ts
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   └── payment.page.ts
├── fixtures/
│   └── app.fixture.ts          # custom fixtures wiring page objects into tests
├── test-data/
│   └── products.ts             # known product IDs used across test suites
├── utils/
│   └── api-client.ts           # API helpers (e.g. fetching product data for verification)
├── playwright.config.ts
├── .env                        # local environment config (gitignored)
└── README.md
```

---

## Setup

### 1. Install dependencies
```bash
npm install
npx playwright install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```
BASE_URL=https://automationexercise.com
VALID_USERNAME=your_test_account_email@example.com
VALID_PASSWORD=your_test_account_password
```

> A valid registered account on the site is required for `VALID_USERNAME` / `VALID_PASSWORD` — these are used by the authentication setup project to log in and generate a reusable session.

---

## Running Tests

Run everything:
```bash
npx playwright test
```

Run a specific project:
```bash
npx playwright test --project=chromium        # login-signup, search, product-details (no auth required)
npx playwright test --project=authenticated    # cart, checkout, payment (auth applied automatically)
npx playwright test --project=setup            # runs only the login/session-seeding step
```

Run a specific file or test by name:
```bash
npx playwright test tests/e2e/search/search.spec.ts
npx playwright test -g "case sensitivity"
```

Useful debug modes:
```bash
npx playwright test --ui               # interactive UI mode
npx playwright test --headed           # see the browser
npx playwright test --debug            # step through with the Inspector
npx playwright show-report             # view the last HTML report
```

---

## Authentication Strategy

Tests under `cart/`, `checkout/`, and `payment/` require a logged-in session. Rather than logging in via the UI in every test:

1. The **`setup` project** (`authConfig/auth.setup.ts`) runs once, logs in via the UI, and saves the authenticated session to `auth/user.json` using Playwright's `storageState`.
2. The **`authenticated` project** declares `dependencies: ['setup']` and loads `auth/user.json` automatically — every test in `cart/`, `checkout/`, and `payment/` starts already logged in.
3. Tests under `login-signup/`, `search/`, and `product-details/` run under the **`chromium`** project with no stored session, since they don't require authentication.

If a test specifically needs to verify logged-out behavior (e.g. the sign-in prompt on checkout), it overrides the project default locally with `test.use({ storageState: { cookies: [], origins: [] } })`.

---

## Page Object Model & Fixtures

- **`pages/`** — one class per page, holding locators and page-specific actions (no assertions).
- **`fixtures/app.fixture.ts`** — wires page objects into the `test` function so specs can request `{ loginPage, cartPage, checkoutPage, ... }` directly instead of manually instantiating them. Specs import `test`/`expect` from this file, not from `@playwright/test`.

Example:
```ts
import { test, expect } from '../../fixtures/app.fixture';

test('user can search for a product by name', async ({ searchPage }) => {
  await searchPage.goto();
  await searchPage.searchProduct('Blue Top');
  await searchPage.verifySearchResultsContainTerm('Blue Top');
});
```

---

## Test Data

- `test-data/products.ts` holds a fixed, deliberately varied set of known product IDs (different categories, brands, and naming edge cases) used for product-details and search verification — not randomly generated, so failures are reproducible across runs.
- Dynamic values that must be unique per run (e.g. signup emails) are generated via helpers in `utils/`, not hardcoded, to avoid collisions across parallel test runs.

---

## Notes

- This site has no formal requirements document (BRD); test scope was derived by direct exploration of the UI and its public API (`/api/productsList`, `/api/verifyLogin`, etc.).
- Some validation rules assumed in early drafts of the test cases (e.g. password complexity, payment field format validation) were later verified against actual site behavior and adjusted — see test case documentation for details.
- API testing is scoped as a separate, module-by-module pass and is not yet part of this repository.
