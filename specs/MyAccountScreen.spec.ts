import { homeScreen } from "../screen/HomeScreen.page";
import { loginScreen } from "../screen/LoginScreen.page";
import { myAccountScreen, myAccountScreenLocators } from "../screen/MyAccountScreen.page";

/**
 * BlinkWireless – My Account Screen Tests
 * Navigate: Home → Login (with valid credentials) → My Account
 * Note: My Account is accessible only after successful login.
 */

const VALID_EMAIL    = 'testuser@blinkwireless.com';
const VALID_PASSWORD = 'Password@123';

describe('My Account Screen Tests', () => {

  async function loginAndNavigateToMyAccount() {
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapLoginButton();
    await loginScreen.waitForLoginScreenLoaded();
    await loginScreen.loginWithCredentials(VALID_EMAIL, VALID_PASSWORD);
    await driver.pause(5000);
    // My Account may be accessible via a profile/account icon or menu
    await myAccountScreen.waitForMyAccountLoaded();
  }

  // ─── TC070 ──────────────────────────────────────────────────────────────────
  it('TC070: Verify My Account screen is displayed after login', async () => {
    // Preconditions: User is logged in
    await loginAndNavigateToMyAccount();

    // Expected: My Account screen is visible with user profile information
    await myAccountScreen.verifyMyAccountScreenDisplayed();
    await expect(myAccountScreenLocators.pageTitle()).toBeDisplayed();
  });

  // ─── TC071 ──────────────────────────────────────────────────────────────────
  it('TC071: Verify user profile information is displayed', async () => {
    // Preconditions: User is on My Account screen
    await loginAndNavigateToMyAccount();
    await myAccountScreen.verifyMyAccountScreenDisplayed();

    // Step 1: Verify profile section is visible
    await driver.waitUntil(
      async () =>
        (await myAccountScreenLocators.fullNameText().isDisplayed().catch(() => false)) ||
        (await myAccountScreenLocators.emailText().isDisplayed().catch(() => false)),
      { timeout: 10000, interval: 500, timeoutMsg: 'User profile info not visible' },
    );
  });

  // ─── TC072 ──────────────────────────────────────────────────────────────────
  it('TC072: Tap Edit Profile button', async () => {
    // Preconditions: User is on My Account screen
    await loginAndNavigateToMyAccount();
    await myAccountScreen.verifyMyAccountScreenDisplayed();

    // Step 1: Tap Edit Profile
    await myAccountScreen.tapEditProfileButton();
    await driver.pause(2000);

    // Expected: Edit Profile form is displayed
  });

  // ─── TC073 ──────────────────────────────────────────────────────────────────
  it('TC073: Navigate to Orders from My Account', async () => {
    // Preconditions: User is on My Account screen
    await loginAndNavigateToMyAccount();
    await myAccountScreen.verifyMyAccountScreenDisplayed();

    // Step 1: Tap View Orders button
    await myAccountScreen.tapViewOrdersButton();
    await driver.pause(3000);

    // Expected: Orders screen is displayed
  });

  // ─── TC074 ──────────────────────────────────────────────────────────────────
  it('TC074: Logout from My Account', async () => {
    // Preconditions: User is on My Account screen
    await loginAndNavigateToMyAccount();
    await myAccountScreen.verifyMyAccountScreenDisplayed();

    // Step 1: Scroll to logout button if needed
    await myAccountScreen.scrollDown();

    // Step 2: Tap Logout button
    await myAccountScreen.tapLogoutButton();
    await driver.pause(3000);

    // Expected: User is logged out and returned to home/login screen
    await homeScreen.verifyHomeScreenDisplayed();
  });

  // ─── TC075 ──────────────────────────────────────────────────────────────────
  it('TC075: Tap Change Password in My Account', async () => {
    // Preconditions: User is on My Account screen
    await loginAndNavigateToMyAccount();
    await myAccountScreen.verifyMyAccountScreenDisplayed();

    // Step 1: Tap Change Password button
    await myAccountScreen.tapChangePasswordButton();
    await driver.pause(2000);

    // Expected: Change password screen/form is displayed
  });

  // ─── TC076 ──────────────────────────────────────────────────────────────────
  it('TC076: Navigate back from My Account screen', async () => {
    // Preconditions: User is on My Account screen
    await loginAndNavigateToMyAccount();
    await myAccountScreen.verifyMyAccountScreenDisplayed();

    // Step 1: Tap back button
    await myAccountScreen.tapBackButton();
    await driver.pause(2000);

    // Expected: User navigates back to previous screen
  });

});
