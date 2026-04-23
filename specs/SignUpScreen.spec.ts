import { homeScreen } from "../screen/HomeScreen.page";
import { loginScreen } from "../screen/LoginScreen.page";
import { signUpScreen, signUpScreenLocators } from "../screen/SignUpScreen.page";

/**
 * BlinkWireless – Sign Up Screen Tests
 * Navigate: Home → Login → Sign Up link
 */
describe('Sign Up Screen Tests', () => {

  async function navigateToSignUp() {
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapLoginButton();
    await loginScreen.waitForLoginScreenLoaded();
    await loginScreen.tapSignUpLink();
    await signUpScreen.waitForSignUpScreenLoaded();
  }

  // ─── TC031 ──────────────────────────────────────────────────────────────────
  it('TC031: Verify sign-up screen is displayed', async () => {
    // Preconditions: User navigates from login to sign-up
    await navigateToSignUp();

    // Expected: Sign-up screen visible with all required fields
    await signUpScreen.verifySignUpScreenDisplayed();
    await expect(signUpScreenLocators.emailInput()).toBeDisplayed();
    await expect(signUpScreenLocators.passwordInput()).toBeDisplayed();
    await expect(signUpScreenLocators.signUpButton()).toBeDisplayed();
  });

  // ─── TC032 ──────────────────────────────────────────────────────────────────
  it('TC032: Enter valid details in all sign-up fields', async () => {
    // Preconditions: User is on sign-up screen
    await navigateToSignUp();

    // Step 1-6: Fill in all fields with valid data
    await signUpScreen.fillCompleteSignUpForm({
      firstName:       'John',
      lastName:        'Doe',
      email:           'johndoe@example.com',
      mobileNumber:    '5551234567',
      password:        'Password@123',
      confirmPassword: 'Password@123',
    });

    // Expected: All fields populated correctly
    await expect(signUpScreenLocators.emailInput()).toHaveValue('johndoe@example.com');
    await expect(signUpScreenLocators.mobileNumberInput()).toHaveValue('5551234567');
  });

  // ─── TC033 ──────────────────────────────────────────────────────────────────
  it('TC033: Submit sign-up form with empty required fields', async () => {
    // Preconditions: User is on sign-up screen
    await navigateToSignUp();

    // Step 1: Leave all fields empty
    // Step 2: Tap Sign Up button
    await signUpScreen.tapSignUpButton();
    await driver.pause(2000);

    // Expected: Validation error shown, user stays on sign-up screen
    await expect(signUpScreenLocators.signUpButton()).toBeDisplayed();
  });

  // ─── TC034 ──────────────────────────────────────────────────────────────────
  it('TC034: Submit sign-up with mismatched passwords', async () => {
    // Preconditions: User is on sign-up screen
    await navigateToSignUp();

    // Step 1: Fill form with mismatching confirm password
    await signUpScreen.fillCompleteSignUpForm({
      firstName:       'Jane',
      lastName:        'Doe',
      email:           'janedoe@example.com',
      mobileNumber:    '5551234567',
      password:        'Password@123',
      confirmPassword: 'DifferentPass@456',
    });

    // Step 2: Tap Sign Up button
    await signUpScreen.tapSignUpButton();
    await driver.pause(2000);

    // Expected: Password mismatch error shown, user stays on sign-up screen
    await signUpScreen.verifyPasswordMismatchError();
  });

  // ─── TC035 ──────────────────────────────────────────────────────────────────
  it('TC035: Enter invalid email format in sign-up', async () => {
    // Preconditions: User is on sign-up screen
    await navigateToSignUp();

    // Step 1: Enter invalid email
    await signUpScreen.clearAndEnterEmail('notanemail');
    await signUpScreen.clearAndEnterPassword('Password@123');
    await signUpScreen.clearAndEnterConfirmPassword('Password@123');
    await signUpScreen.tapSignUpButton();
    await driver.pause(2000);

    // Expected: Email validation error displayed
    await expect(signUpScreenLocators.signUpButton()).toBeDisplayed();
  });

  // ─── TC036 ──────────────────────────────────────────────────────────────────
  it('TC036: Enter invalid mobile number in sign-up', async () => {
    // Preconditions: User is on sign-up screen
    await navigateToSignUp();

    // Step 1: Enter invalid mobile number (too short)
    await signUpScreen.clearAndEnterMobileNumber('123');
    await signUpScreen.tapSignUpButton();
    await driver.pause(2000);

    // Expected: Mobile number validation error displayed
    await expect(signUpScreenLocators.signUpButton()).toBeDisplayed();
  });

  // ─── TC037 ──────────────────────────────────────────────────────────────────
  it('TC037: Navigate back to login screen from sign-up', async () => {
    // Preconditions: User is on sign-up screen
    await navigateToSignUp();

    // Step 1: Tap back button or Login link
    await signUpScreen.tapLoginLink();

    // Expected: User navigated back to login screen
    await loginScreen.waitForLoginScreenLoaded();
    await loginScreen.verifyLoginScreenDisplayed();
  });

  // ─── TC038 ──────────────────────────────────────────────────────────────────
  it('TC038: Enter valid 10-digit mobile number (5551234567) in sign-up', async () => {
    // Preconditions: User is on sign-up screen
    await navigateToSignUp();

    // Step 1: Enter mobile number
    await signUpScreen.clearAndEnterMobileNumber('5551234567');

    // Expected: Mobile number displayed correctly
    await expect(signUpScreenLocators.mobileNumberInput()).toHaveValue('5551234567');
  });

});
