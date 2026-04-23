import { homeScreen } from "../screen/HomeScreen.page";
import { loginScreen, loginScreenLocators } from "../screen/LoginScreen.page";

/**
 * BlinkWireless – Login Screen Tests
 * Navigate: Home → tap Login button (top-right corner)
 */
describe('Login Screen Tests', () => {

  async function navigateToLogin() {
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapLoginButton();
    await loginScreen.waitForLoginScreenLoaded();
  }

  // ─── TC021 ──────────────────────────────────────────────────────────────────
  it('TC021: Verify login screen is displayed after tapping Login', async () => {
    // Preconditions: App is on home screen
    await navigateToLogin();

    // Expected: Login screen visible with email, password fields and login button
    await loginScreen.verifyLoginScreenDisplayed();
    await expect(loginScreenLocators.emailInput()).toBeDisplayed();
    await expect(loginScreenLocators.passwordInput()).toBeDisplayed();
    await expect(loginScreenLocators.loginButton()).toBeDisplayed();
  });

  // ─── TC022 ──────────────────────────────────────────────────────────────────
  it('TC022: Enter valid email in login form', async () => {
    // Preconditions: User is on login screen
    await navigateToLogin();

    // Step 1: Tap email field, Step 2: Enter valid email
    await loginScreen.clearAndEnterEmail('testuser@example.com');

    // Expected: Email is displayed correctly in the field
    await loginScreen.verifyEmailFieldValue('testuser@example.com');
  });

  // ─── TC023 ──────────────────────────────────────────────────────────────────
  it('TC023: Enter valid password in login form', async () => {
    // Preconditions: User is on login screen
    await navigateToLogin();

    // Step 1: Tap password field, Step 2: Enter password
    await loginScreen.clearAndEnterPassword('Password@123');

    // Expected: Password field shows entered value (masked)
    await expect(loginScreenLocators.passwordInput()).toBeDisplayed();
    await expect(loginScreenLocators.passwordInput()).toBeEnabled();
  });

  // ─── TC024 ──────────────────────────────────────────────────────────────────
  it('TC024: Login with empty email and password', async () => {
    // Preconditions: User is on login screen
    await navigateToLogin();

    // Step 1: Leave email and password empty
    // Step 2: Tap Login button
    await loginScreen.tapLoginButton();
    await driver.pause(2000);

    // Expected: Validation error is shown, user stays on login screen
    await expect(loginScreenLocators.loginButton()).toBeDisplayed();
  });

  // ─── TC025 ──────────────────────────────────────────────────────────────────
  it('TC025: Login with invalid email format', async () => {
    // Preconditions: User is on login screen
    await navigateToLogin();

    // Step 1: Enter invalid email format
    await loginScreen.clearAndEnterEmail('invalidemail');

    // Step 2: Enter some password
    await loginScreen.clearAndEnterPassword('Password@123');

    // Step 3: Tap Login button
    await loginScreen.tapLoginButton();
    await driver.pause(2000);

    // Expected: Validation error displayed, user remains on login screen
    await expect(loginScreenLocators.loginButton()).toBeDisplayed();
  });

  // ─── TC026 ──────────────────────────────────────────────────────────────────
  it('TC026: Login with wrong credentials', async () => {
    // Preconditions: User is on login screen
    await navigateToLogin();

    // Step 1: Enter wrong email and password
    await loginScreen.loginWithCredentials('wrong@email.com', 'WrongPass123');

    // Step 2: Wait for response
    await driver.pause(5000);

    // Expected: Error message displayed indicating invalid credentials
    // User stays on login screen
    await expect(loginScreenLocators.loginButton()).toBeDisplayed();
  });

  // ─── TC027 ──────────────────────────────────────────────────────────────────
  it('TC027: Navigate to Sign Up screen from login', async () => {
    // Preconditions: User is on login screen
    await navigateToLogin();

    // Step 1: Tap Sign Up / Register link
    await loginScreen.tapSignUpLink();

    // Expected: User is navigated to sign-up screen
    await driver.pause(2000);
    // Sign-up screen loaded – no longer on login screen
    await expect(loginScreenLocators.loginButton()).not.toBeDisplayed();
  });

  // ─── TC028 ──────────────────────────────────────────────────────────────────
  it('TC028: Navigate back to home screen from login', async () => {
    // Preconditions: User is on login screen
    await navigateToLogin();

    // Step 1: Tap back button
    await loginScreen.tapBackButton();

    // Expected: User returns to Home screen
    await homeScreen.verifyHomeScreenDisplayed();
  });

  // ─── TC029 ──────────────────────────────────────────────────────────────────
  it('TC029: Verify forgot password link is present', async () => {
    // Preconditions: User is on login screen
    await navigateToLogin();

    // Step 1: Verify forgot password link is visible and tappable
    await expect(loginScreenLocators.forgotPasswordLink()).toBeDisplayed();
    await loginScreen.tapForgotPasswordLink();

    // Expected: Forgot password flow is initiated
    await driver.pause(2000);
  });

  // ─── TC030 ──────────────────────────────────────────────────────────────────
  it('TC030: Login with empty email only', async () => {
    // Preconditions: User is on login screen
    await navigateToLogin();

    // Step 1: Leave email empty, enter password
    await loginScreen.clearAndEnterPassword('Password@123');

    // Step 2: Tap Login button
    await loginScreen.tapLoginButton();
    await driver.pause(2000);

    // Expected: Validation error for missing email, user stays on login screen
    await expect(loginScreenLocators.loginButton()).toBeDisplayed();
  });

});
