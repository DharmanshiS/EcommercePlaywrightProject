import { BasePage } from './base-pom';

export class LoginPage extends BasePage {

    // Fields
    usernameField = this.page.locator('#username');
    passwordField = this.page.locator('#password');
    loginButton = this.page.locator('button[value="Log in"]');
    dismissButton = this.page.locator('text=Dismiss');   

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