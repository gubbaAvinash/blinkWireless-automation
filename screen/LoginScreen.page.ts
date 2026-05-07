import { homeScreenLocators } from "./HomeScreen.page";

const loginScreenLocators = {
  emailField: () => $('//android.widget.EditText[@content-desc="name_i"]'),
  submitButton: () => $('//android.widget.Button[@text="Submit"]'),
  emailValidationErrorMsg: () => $('//android.widget.TextView[@content-desc="emailaddress_error_msg"]'),
};

class LoginScreen {
  async launchApp() {
    await driver.terminateApp("com.wavemaker.turbomobiles");
    await driver.activateApp("com.wavemaker.turbomobiles");
  }

  async navigateToLogin() {
    await this.launchApp();
    await homeScreenLocators.loginButton().waitForDisplayed();
    await homeScreenLocators.loginButton().click();
  }

  async verifyLoginScreenDisplayed() {
    await loginScreenLocators.emailField().waitForDisplayed();
    await expect(loginScreenLocators.emailField()).toBeDisplayed();
  }

  async enterCredentialsAndSubmit(email: string) {
    await driver.hideKeyboard();
    const emailInput = loginScreenLocators.emailField();
    await emailInput.waitForDisplayed();
    await emailInput.click();
    await emailInput.clearValue();
    for (const ch of email) {
      await emailInput.addValue(ch);
    }
    await driver.hideKeyboard();
    await loginScreenLocators.submitButton().waitForDisplayed();
    await loginScreenLocators.submitButton().click();
  }

  getEmailValidationError() {
    return loginScreenLocators.emailValidationErrorMsg();
  }
}

const loginScreen = new LoginScreen();

export { loginScreen, loginScreenLocators };
