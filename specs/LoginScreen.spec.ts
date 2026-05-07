import { homeScreen } from "../screen/HomeScreen.page";
import { loginScreen } from "../screen/LoginScreen.page";

describe('Login Screen Tests', () => {
  it('TC001_LoginScreen: Verify navigation to login and UI elements', async () => {
    await homeScreen.tapLoginButton();
    await loginScreen.verifyLoginScreenDisplayed();
  });

  it('TC002_LoginScreen: Validate with wrong email format', async () => {
    await loginScreen.verifyLoginScreenDisplayed();
    await loginScreen.enterCredentialsAndSubmit('testEmail');
    await expect(loginScreen.getEmailValidationError()).toHaveText('Please Enter Valid Email');
  });

  it('TC003_LoginScreen: Validate with correct email format', async () => {
    await loginScreen.verifyLoginScreenDisplayed();
    await loginScreen.enterCredentialsAndSubmit('test@test.com');
    await browser.waitUntil(
      async () => !(await loginScreen.getEmailValidationError().isExisting()),
      { timeout: 5000, timeoutMsg: 'Email validation error should not appear for a valid address' }
    );
  });

});