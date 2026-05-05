import { loginScreen } from "../screen/loginScreen.page";

describe('Login Screen Tests', () => {
  it('TC001_LoginScreen: Verify navigation to login screen from home', async () => {
    // Preconditions: App is launched and home screen is displayed
    await loginScreen.navigateToLogin();
    
    // Expected result: User is navigated to the login screen
    await loginScreen.verifyLoginScreenDisplayed();
  });
});