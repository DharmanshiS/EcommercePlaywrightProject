import { test as base, expect, Page, TestInfo } from '@playwright/test';
import { AccountPage } from '../POM/AccountPage';
import { LoginPage } from '../POM/LoginPage';
import { NavigationBar } from '../POM/NavigationBar';
import * as dotenv from 'dotenv';

dotenv.config(); // Load variables from .env file

type MyFixtures = {
  loggedInNav: NavigationBar;
};

const test = base.extend<MyFixtures>({
  loggedInNav: async ({ page }, use, testInfo: TestInfo) => {
    const siteUrl = process.env.SITE_URL ?? 'https://www.edgewordstraining.co.uk/demo-site/my-account/';
    await page.goto(siteUrl);

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.clickDismiss(); // Remove the warning
    console.log("Removed the banner.");

    await loginPage.login(process.env.TEST_USERNAME || '', process.env.TEST_PASSWORD || '');
    const accountPage = new AccountPage(page);
    await expect(accountPage.accountTitle).toContainText('My account');
    console.log("Successfully logged in.");

    const navBar = new NavigationBar(page);
    await use(navBar);  // Run the test

    // Take a screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = testInfo.outputPath(`pointOfFailure.png`);
      await page.screenshot({ path: screenshotPath, timeout: 5000 });
      testInfo.attachments.push({
        name: 'Screenshot at failure',
        path: screenshotPath,
        contentType: 'image/png'
      });
      console.log("An error occurred and a screenshot was taken.");
    }

    // Logout
    await navBar.navigateToMyAccount();
    await navBar.logout();
    console.log("Successfully logged out.");

    // Close context to clean up
    await page.context().close();
  },
});

export { test, expect };
