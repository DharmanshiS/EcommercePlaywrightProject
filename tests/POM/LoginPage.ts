import { Page, Locator } from '@playwright/test';

export class LoginPage {

    // Fields
    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    dismissButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('button[value="Log in"]');
        this.dismissButton = page.locator('text=Dismiss');
    }

    // Service Methods
    async setUsername(username: string): Promise<void> {
        await this.usernameField.fill(username);
    }

    async setPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async submitForm(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.submitForm();
    }

    async clickDismiss(): Promise<void> {
        await this.dismissButton.click(); // Remove the warning at the bottom to avoid missing any elements on the screen
    }
}