// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: process.env.BASE_URL,
    navigationTimeout: 60000, 
    trace: 'on-first-retry',
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'on-failure' }]],
  projects: [
    {
      name: 'setup',
      testDir: './authConfig',
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: 'authenticated',
      testMatch: [
        'cart/**/*.spec.ts',
        'checkout/**/*.spec.ts',
        'payment/**/*.spec.ts',
      ],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'chromium',
      testMatch: [
        'login-signup/**/*.spec.ts',
        'search/**/*.spec.ts',
        'product-details/**/*.spec.ts',
      ],
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});