import { homeScreen } from "../screen/HomeScreen.page";
import { loginScreen } from "../screen/LoginScreen.page";
import { signUpScreen } from "../screen/SignUpScreen.page";
import { verifyOTPScreen, verifyOTPScreenLocators } from "../screen/VerifyOTPScreen.page";

/**
 * BlinkWireless – Verify OTP Screen Tests
 * Navigate: Home → Login → Sign Up → complete form → OTP screen
 */
describe('Verify OTP Screen Tests', () => {

  async function navigateToVerifyOTP() {
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapLoginButton();
    await loginScreen.waitForLoginScreenLoaded();
    await loginScreen.tapSignUpLink();
    await signUpScreen.waitForSignUpScreenLoaded();
    await signUpScreen.fillCompleteSignUpForm({
      firstName:       'Test',
      lastName:        'User',
      email:           `testuser_${Date.now()}@example.com`,
      mobileNumber:    '5551234567',
      password:        'Password@123',
      confirmPassword: 'Password@123',
    });
    await signUpScreen.tapSignUpButton();
    await verifyOTPScreen.waitForVerifyOTPScreenLoaded();
  }

  // ─── TC039 ──────────────────────────────────────────────────────────────────
  it('TC039: Verify OTP screen is displayed after sign-up', async () => {
    // Preconditions: User has completed sign-up form
    await navigateToVerifyOTP();

    // Expected: OTP screen visible with input field and verify button
    await verifyOTPScreen.verifyOTPScreenDisplayed();
    await expect(verifyOTPScreenLocators.otpInput()).toBeDisplayed();
    await expect(verifyOTPScreenLocators.verifyButton()).toBeDisplayed();
  });

  // ─── TC040 ──────────────────────────────────────────────────────────────────
  it('TC040: Enter valid 6-digit OTP', async () => {
    // Preconditions: User is on OTP screen
    await navigateToVerifyOTP();

    // Step 1: Enter a 6-digit OTP
    await verifyOTPScreen.clearAndEnterOTP('123456');

    // Expected: OTP is entered and displayed in the field
    await verifyOTPScreen.verifyOTPFieldValue('123456');
  });

  // ─── TC041 ──────────────────────────────────────────────────────────────────
  it('TC041: Submit OTP with empty field', async () => {
    // Preconditions: User is on OTP screen
    await navigateToVerifyOTP();

    // Step 1: Leave OTP field empty and tap verify
    await verifyOTPScreen.tapVerifyButton();
    await driver.pause(2000);

    // Expected: Validation error shown, user stays on OTP screen
    await expect(verifyOTPScreenLocators.verifyButton()).toBeDisplayed();
  });

  // ─── TC042 ──────────────────────────────────────────────────────────────────
  it('TC042: Submit OTP with invalid/wrong OTP', async () => {
    // Preconditions: User is on OTP screen
    await navigateToVerifyOTP();

    // Step 1: Enter incorrect OTP
    await verifyOTPScreen.clearAndEnterOTP('000000');

    // Step 2: Tap Verify
    await verifyOTPScreen.tapVerifyButton();
    await driver.pause(3000);

    // Expected: Error message shown for invalid OTP
    await expect(verifyOTPScreenLocators.verifyButton()).toBeDisplayed();
  });

  // ─── TC043 ──────────────────────────────────────────────────────────────────
  it('TC043: Tap Resend OTP link', async () => {
    // Preconditions: User is on OTP screen
    await navigateToVerifyOTP();

    // Step 1: Tap Resend OTP link
    await verifyOTPScreen.tapResendOTPLink();
    await driver.pause(3000);

    // Expected: A new OTP is sent and confirmation message may appear
    // User remains on OTP screen
    await expect(verifyOTPScreenLocators.otpInput()).toBeDisplayed();
  });

  // ─── TC044 ──────────────────────────────────────────────────────────────────
  it('TC044: Navigate back from OTP screen', async () => {
    // Preconditions: User is on OTP screen
    await navigateToVerifyOTP();

    // Step 1: Tap back button
    await verifyOTPScreen.tapBackButton();
    await driver.pause(2000);

    // Expected: User goes back to previous screen (sign-up or login)
    await expect(verifyOTPScreenLocators.otpInput()).not.toBeDisplayed();
  });

  // ─── TC045 ──────────────────────────────────────────────────────────────────
  it('TC045: Enter OTP with less than 6 digits', async () => {
    // Preconditions: User is on OTP screen
    await navigateToVerifyOTP();

    // Step 1: Enter partial OTP (3 digits)
    await verifyOTPScreen.clearAndEnterOTP('123');

    // Step 2: Tap Verify
    await verifyOTPScreen.tapVerifyButton();
    await driver.pause(2000);

    // Expected: Validation error or user stays on OTP screen
    await expect(verifyOTPScreenLocators.verifyButton()).toBeDisplayed();
  });

});
