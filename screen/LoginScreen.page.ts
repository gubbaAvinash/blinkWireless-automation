import { homeScreenLocators } from "./HomeScreen.page";

const loginScreenLocators = {
  
  emailField: () => $('//android.widget.EditText[@content-desc="name_i"]'),
  // Sign-in action is labeled "Get Email OTP" (not "Submit") on BlinkWireless.
  submitButton: () => $('//*[contains(@text,"Get Email OTP") or @content-desc="loggedInUserForm1_button_formAction_a" or contains(@resource-id,"loggedInUserForm1_button_formAction")]'),
  getEmailOTPButton: () => $('//*[contains(@text,"Get Email OTP") or @content-desc="loggedInUserForm1_button_formAction_a" or contains(@resource-id,"loggedInUserForm1_button_formAction")]'),
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
    console.log('************ login screen displayed ************');
  }

  async enterCredentialsAndSubmit(email: string) {
    console.log('************ enter email ************');
    const emailInput = loginScreenLocators.emailField();
    await emailInput.waitForDisplayed({ timeout: 2000 });
    console.log('************ email field displayed ************');
    // Focus first: clearValue() before click() often hangs or no-ops on Android when the field is not focused.
    await emailInput.click();
    await emailInput.clearValue();
    console.log('************ enter clear success ************');
    // for (const char of email) {
    //   await emailInput.addValue(char);
    // }
    await emailInput.setValue(email);

      // Uses native Android input — bypasses keyboard entirely
  // await driver.execute('mobile: type', { text: email });
  // console.log('************ email entered ************');

    // await driver.hideKeyboard();
    await loginScreenLocators.getEmailOTPButton().waitForDisplayed();
    await loginScreenLocators.getEmailOTPButton().click();
  }

  getEmailValidationError() {
    return loginScreenLocators.emailValidationErrorMsg();
  }
}

const loginScreen = new LoginScreen();

export { loginScreen, loginScreenLocators };
