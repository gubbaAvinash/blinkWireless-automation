import { homeScreenLocators } from "./HomeScreen.page";

const loginScreenLocators = {
  // Login screen specific locators would be defined here based on actual login screen elements
  // For now, using placeholder selectors as actual login screen elements are not provided
  loginForm: () => $('//android.widget.LinearLayout[@resource-id="loginForm"]'),
  usernameField: () => $('//android.widget.EditText[@resource-id="username"]'),
  passwordField: () => $('//android.widget.EditText[@resource-id="password"]'),
  submitButton: () => $('//android.widget.Button[@text="Submit"]'),
  backButton: () => $('//android.widget.Button[@content-desc="Navigate up"]')
};

class LoginScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await homeScreenLocators.blinkWirelessLogo().waitForDisplayed({ timeout: 10000 });
  }

  async navigateToLogin() {
    await this.launchApp();
    await homeScreenLocators.loginButton().waitForDisplayed();
    await homeScreenLocators.loginButton().click();
  }

  async verifyLoginScreenDisplayed() {
    await loginScreenLocators.loginForm().waitForDisplayed({ timeout: 5000 });
    await expect(loginScreenLocators.loginForm()).toBeDisplayed();
  }

  async enterCredentials(username: string, password: string) {
    await loginScreenLocators.usernameField().waitForDisplayed();
    await loginScreenLocators.usernameField().setValue(username);
    await loginScreenLocators.passwordField().setValue(password);
  }

  async tapSubmitButton() {
    await loginScreenLocators.submitButton().waitForDisplayed();
    await loginScreenLocators.submitButton().click();
  }
}

const loginScreen = new LoginScreen();

export { loginScreen, loginScreenLocators };