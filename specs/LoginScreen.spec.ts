import { homeScreen } from "../screen/HomeScreen.page";
import { loginScreen } from "../screen/LoginScreen.page";

describe('Login Screen Tests', () => {
  it('TC001_LoginScreen: Verify navigation to login and UI elements', async () => {

    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapLoginButton();
    await loginScreen.verifyLoginScreenDisplayed();
    await driver.terminateApp('com.wavemaker.turbomobiles');
  });

  it.only('TC002_LoginScreen: Validate with wrong email format', async () => {
    console.log('************ Test 002 started ************');
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapLoginButton();
    await loginScreen.verifyLoginScreenDisplayed();
    console.log('************ enter email ************');
    await loginScreen.enterCredentialsAndSubmit('testEmail');
    console.log('************ enter email completed ************');
    await expect(loginScreen.getEmailValidationError()).toHaveText('Please Enter Valid Email');
    console.log('************ Test 002 completed ************');
  });

  it('TC003_LoginScreen: Validate with correct email format', async () => {
    console.log('************ Test 003 started ************');
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapLoginButton();
    await loginScreen.verifyLoginScreenDisplayed();
    await loginScreen.enterCredentialsAndSubmit('test@test.com');
    await browser.waitUntil(
      async () => !(await loginScreen.getEmailValidationError().isExisting()),
      { timeout: 5000, timeoutMsg: 'Email validation error should not appear for a valid address' }
    );
    console.log('************ Test 003 completed ************');
  });

});