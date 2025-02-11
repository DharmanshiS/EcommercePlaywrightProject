import { test as base, expect, TestInfo } from '@playwright/test';
import { AccountPage } from '../pom/account-page';
import { LoginPage } from '../pom/login-page';
import { NavigationBar } from '../pom/navigation-bar';
import * as dotenv from 'dotenv';

dotenv.config(); // Load variables from .env file


type LoginOptions = {
  username?: string; // Optionally override username
  password?: string; // Optionally override password
  dismissWarning?: boolean; // Optionally dismiss warnings
};

type MyFixtures = {
  loggedInNav: NavigationBar;
};

const test = base.extend<MyFixtures & {loginOptions: LoginOptions}>({
  loginOptions: [
    {
      username: process.env.SITE_USERNAME || "",
      password: process.env.SITE_PASSWORD || "",
      dismissWarning: true,
    },
    {
      option: true
    },
  ],
  
  loggedInNav: async ({ page, loginOptions }, use, testInfo: TestInfo) => {
    const siteUrl = process.env.SITE_URL ?? 'https://www.edgewordstraining.co.uk/demo-site/my-account/';
    await page.goto(siteUrl);

    // Login
    const loginPage = new LoginPage(page);
    if (loginOptions.dismissWarning){
      await loginPage.clickDismiss(); // Remove the warning
    }
    
    await loginPage.login(loginOptions?.username ?? process.env.SITE_USERNAME ?? '', loginOptions?.password ?? process.env.SITE_PASSWORD ?? '');
    const accountPage = new AccountPage(page);
    await expect(accountPage.accountTitle).toContainText('My account');

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
