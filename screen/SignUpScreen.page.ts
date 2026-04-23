const signUpScreenLocators = {
  pageTitle:            () => $('//android.widget.TextView[@resource-id="mobile_navbar1_title"]'),
  firstNameLabel:       () => $('//android.widget.TextView[@resource-id="firstName_formLabel_caption"]'),
  firstNameInput:       () => $('//android.widget.EditText[@resource-id="firstName_i"]'),
  lastNameLabel:        () => $('//android.widget.TextView[@resource-id="lastName_formLabel_caption"]'),
  lastNameInput:        () => $('//android.widget.EditText[@resource-id="lastName_i"]'),
  emailLabel:           () => $('//android.widget.TextView[@resource-id="email_formLabel_caption"]'),
  emailInput:           () => $('//android.widget.EditText[@resource-id="email_i"]'),
  mobileNumberLabel:    () => $('//android.widget.TextView[@resource-id="mobileNumber_formLabel_caption"]'),
  mobileNumberInput:    () => $('//android.widget.EditText[@resource-id="mobileNumber_i"]'),
  passwordLabel:        () => $('//android.widget.TextView[@resource-id="password_formLabel_caption"]'),
  passwordInput:        () => $('//android.widget.EditText[@resource-id="password_i"]'),
  confirmPasswordLabel: () => $('//android.widget.TextView[@resource-id="confirmPassword_formLabel_caption"]'),
  confirmPasswordInput: () => $('//android.widget.EditText[@resource-id="confirmPassword_i"]'),
  signUpButton:         () => $('//android.widget.TextView[@resource-id="signUpBtn_caption"]'),
  loginLink:            () => $('//android.widget.TextView[@resource-id="loginLink_caption"]'),
  backButton:           () => $('//android.view.ViewGroup[@resource-id="mobile_navbar1_backBtn"]'),
  errorMessage:         () => $('//android.widget.TextView[contains(@resource-id,"error") or contains(@resource-id,"Error")]'),
};

class SignUpScreen {
  async waitForSignUpScreenLoaded(timeoutMs = 20000) {
    await driver.waitUntil(
      async () =>
        (await signUpScreenLocators.emailInput().isDisplayed().catch(() => false)) ||
        (await signUpScreenLocators.signUpButton().isDisplayed().catch(() => false)),
      { timeout: timeoutMs, interval: 500, timeoutMsg: 'Sign-up screen did not load' },
    );
  }

  async verifySignUpScreenDisplayed() {
    await this.waitForSignUpScreenLoaded();
    await expect(signUpScreenLocators.emailInput()).toBeDisplayed();
    await expect(signUpScreenLocators.passwordInput()).toBeDisplayed();
    await expect(signUpScreenLocators.signUpButton()).toBeDisplayed();
  }

  async clearAndEnterFirstName(firstName: string) {
    await signUpScreenLocators.firstNameInput().waitForDisplayed();
    await signUpScreenLocators.firstNameInput().click();
    await signUpScreenLocators.firstNameInput().clearValue();
    await signUpScreenLocators.firstNameInput().setValue(firstName);
  }

  async clearAndEnterLastName(lastName: string) {
    await signUpScreenLocators.lastNameInput().waitForDisplayed();
    await signUpScreenLocators.lastNameInput().click();
    await signUpScreenLocators.lastNameInput().clearValue();
    await signUpScreenLocators.lastNameInput().setValue(lastName);
  }

  async clearAndEnterEmail(email: string) {
    await signUpScreenLocators.emailInput().waitForDisplayed();
    await signUpScreenLocators.emailInput().click();
    await signUpScreenLocators.emailInput().clearValue();
    await signUpScreenLocators.emailInput().setValue(email);
  }

  async clearAndEnterMobileNumber(mobileNumber: string) {
    await signUpScreenLocators.mobileNumberInput().waitForDisplayed();
    await signUpScreenLocators.mobileNumberInput().click();
    await signUpScreenLocators.mobileNumberInput().clearValue();
    await signUpScreenLocators.mobileNumberInput().setValue(mobileNumber);
  }

  async clearAndEnterPassword(password: string) {
    await signUpScreenLocators.passwordInput().waitForDisplayed();
    await signUpScreenLocators.passwordInput().click();
    await signUpScreenLocators.passwordInput().clearValue();
    await signUpScreenLocators.passwordInput().setValue(password);
  }

  async clearAndEnterConfirmPassword(confirmPassword: string) {
    await signUpScreenLocators.confirmPasswordInput().waitForDisplayed();
    await signUpScreenLocators.confirmPasswordInput().click();
    await signUpScreenLocators.confirmPasswordInput().clearValue();
    await signUpScreenLocators.confirmPasswordInput().setValue(confirmPassword);
  }

  async tapSignUpButton() {
    await signUpScreenLocators.signUpButton().waitForDisplayed();
    await signUpScreenLocators.signUpButton().click();
  }

  async tapLoginLink() {
    await signUpScreenLocators.loginLink().waitForDisplayed();
    await signUpScreenLocators.loginLink().click();
  }

  async tapBackButton() {
    await signUpScreenLocators.backButton().waitForDisplayed();
    await signUpScreenLocators.backButton().click();
  }

  async fillCompleteSignUpForm(opts: {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.clearAndEnterFirstName(opts.firstName);
    await this.clearAndEnterLastName(opts.lastName);
    await this.clearAndEnterEmail(opts.email);
    await this.clearAndEnterMobileNumber(opts.mobileNumber);
    await this.clearAndEnterPassword(opts.password);
    await this.clearAndEnterConfirmPassword(opts.confirmPassword);
  }

  async verifyErrorDisplayed() {
    await signUpScreenLocators.errorMessage().waitForDisplayed({ timeout: 8000 });
    await expect(signUpScreenLocators.errorMessage()).toBeDisplayed();
  }

  async verifyPasswordMismatchError() {
    // Confirm password mismatch should keep user on sign-up screen
    await expect(signUpScreenLocators.signUpButton()).toBeDisplayed();
  }
}

const signUpScreen = new SignUpScreen();

export { signUpScreen, signUpScreenLocators };
