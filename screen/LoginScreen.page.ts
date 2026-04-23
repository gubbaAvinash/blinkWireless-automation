const loginScreenLocators = {
  blinkWirelessLogo:  () => $('//android.widget.ImageView[@content-desc="pictureLogo_picture"]'),
  pageTitle:          () => $('//android.widget.TextView[@resource-id="mobile_navbar1_title"]'),
  emailLabel:         () => $('//android.widget.TextView[@resource-id="email_formLabel_caption"]'),
  emailInput:         () => $('//android.widget.EditText[@resource-id="email_i"]'),
  passwordLabel:      () => $('//android.widget.TextView[@resource-id="password_formLabel_caption"]'),
  passwordInput:      () => $('//android.widget.EditText[@resource-id="password_i"]'),
  loginButton:        () => $('//android.widget.TextView[@resource-id="loginBtn_caption"]'),
  forgotPasswordLink: () => $('//android.widget.TextView[@resource-id="forgotPasswordLink_caption"]'),
  signUpLink:         () => $('//android.widget.TextView[@resource-id="signUpLink_caption"]'),
  errorMessage:       () => $('//android.widget.TextView[contains(@resource-id,"error") or contains(@resource-id,"Error")]'),
  backButton:         () => $('//android.view.ViewGroup[@resource-id="mobile_navbar1_backBtn"]'),
};

class LoginScreen {
  async waitForLoginScreenLoaded(timeoutMs = 20000) {
    await driver.waitUntil(
      async () =>
        (await loginScreenLocators.emailInput().isDisplayed().catch(() => false)) ||
        (await loginScreenLocators.loginButton().isDisplayed().catch(() => false)),
      { timeout: timeoutMs, interval: 500, timeoutMsg: 'Login screen did not load' },
    );
  }

  async verifyLoginScreenDisplayed() {
    await this.waitForLoginScreenLoaded();
    await expect(loginScreenLocators.emailInput()).toBeDisplayed();
    await expect(loginScreenLocators.passwordInput()).toBeDisplayed();
    await expect(loginScreenLocators.loginButton()).toBeDisplayed();
  }

  async clearAndEnterEmail(email: string) {
    await loginScreenLocators.emailInput().waitForDisplayed();
    await loginScreenLocators.emailInput().click();
    await loginScreenLocators.emailInput().clearValue();
    await loginScreenLocators.emailInput().setValue(email);
  }

  async clearAndEnterPassword(password: string) {
    await loginScreenLocators.passwordInput().waitForDisplayed();
    await loginScreenLocators.passwordInput().click();
    await loginScreenLocators.passwordInput().clearValue();
    await loginScreenLocators.passwordInput().setValue(password);
  }

  async tapLoginButton() {
    await loginScreenLocators.loginButton().waitForDisplayed();
    await loginScreenLocators.loginButton().click();
  }

  async tapForgotPasswordLink() {
    await loginScreenLocators.forgotPasswordLink().waitForDisplayed();
    await loginScreenLocators.forgotPasswordLink().click();
  }

  async tapSignUpLink() {
    await loginScreenLocators.signUpLink().waitForDisplayed();
    await loginScreenLocators.signUpLink().click();
  }

  async tapBackButton() {
    await loginScreenLocators.backButton().waitForDisplayed();
    await loginScreenLocators.backButton().click();
  }

  async loginWithCredentials(email: string, password: string) {
    await this.clearAndEnterEmail(email);
    await this.clearAndEnterPassword(password);
    await this.tapLoginButton();
  }

  async verifyLoginErrorDisplayed() {
    await loginScreenLocators.errorMessage().waitForDisplayed({ timeout: 8000 });
    await expect(loginScreenLocators.errorMessage()).toBeDisplayed();
  }

  async verifyEmailFieldValue(expected: string) {
    await expect(loginScreenLocators.emailInput()).toHaveValue(expected);
  }

  async verifyPasswordFieldValue(expected: string) {
    await expect(loginScreenLocators.passwordInput()).toHaveValue(expected);
  }
}

const loginScreen = new LoginScreen();

export { loginScreen, loginScreenLocators };
