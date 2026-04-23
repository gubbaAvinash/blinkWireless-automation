const verifyOTPScreenLocators = {
  pageTitle:       () => $('//android.widget.TextView[@resource-id="mobile_navbar1_title"]'),
  instructionText: () => $('//android.widget.TextView[@resource-id="lblVerifyOTPInstruction_caption"]'),
  otpInput:        () => $('//android.widget.EditText[@resource-id="otpInput_i"]'),
  verifyButton:    () => $('//android.widget.TextView[@resource-id="verifyOTPBtn_caption"]'),
  resendOTPLink:   () => $('//android.widget.TextView[@resource-id="resendOTPLink_caption"]'),
  backButton:      () => $('//android.view.ViewGroup[@resource-id="mobile_navbar1_backBtn"]'),
  errorMessage:    () => $('//android.widget.TextView[contains(@resource-id,"error") or contains(@resource-id,"Error")]'),
  successMessage:  () => $('//android.widget.TextView[contains(@resource-id,"success") or contains(@resource-id,"Success")]'),
};

const VERIFY_OTP_LOAD_TIMEOUT_MS = 20000;

class VerifyOTPScreen {
  async waitForVerifyOTPScreenLoaded(timeoutMs = VERIFY_OTP_LOAD_TIMEOUT_MS) {
    await driver.waitUntil(
      async () =>
        (await verifyOTPScreenLocators.otpInput().isDisplayed().catch(() => false)) ||
        (await verifyOTPScreenLocators.verifyButton().isDisplayed().catch(() => false)),
      { timeout: timeoutMs, interval: 500, timeoutMsg: 'Verify OTP screen did not load' },
    );
  }

  async verifyOTPScreenDisplayed() {
    await this.waitForVerifyOTPScreenLoaded();
    await expect(verifyOTPScreenLocators.otpInput()).toBeDisplayed();
    await expect(verifyOTPScreenLocators.verifyButton()).toBeDisplayed();
  }

  async clearAndEnterOTP(otp: string) {
    await verifyOTPScreenLocators.otpInput().waitForDisplayed();
    await verifyOTPScreenLocators.otpInput().click();
    await verifyOTPScreenLocators.otpInput().clearValue();
    await verifyOTPScreenLocators.otpInput().setValue(otp);
  }

  async tapVerifyButton() {
    await verifyOTPScreenLocators.verifyButton().waitForDisplayed();
    await verifyOTPScreenLocators.verifyButton().click();
  }

  async tapResendOTPLink() {
    await verifyOTPScreenLocators.resendOTPLink().waitForDisplayed();
    await verifyOTPScreenLocators.resendOTPLink().click();
  }

  async tapBackButton() {
    await verifyOTPScreenLocators.backButton().waitForDisplayed();
    await verifyOTPScreenLocators.backButton().click();
  }

  async verifyOTPFieldValue(expected: string) {
    await expect(verifyOTPScreenLocators.otpInput()).toHaveValue(expected);
  }

  async verifyErrorDisplayed() {
    await verifyOTPScreenLocators.errorMessage().waitForDisplayed({ timeout: 8000 });
    await expect(verifyOTPScreenLocators.errorMessage()).toBeDisplayed();
  }

  async verifySuccessDisplayed() {
    await verifyOTPScreenLocators.successMessage().waitForDisplayed({ timeout: 8000 });
    await expect(verifyOTPScreenLocators.successMessage()).toBeDisplayed();
  }
}

const verifyOTPScreen = new VerifyOTPScreen();

export { verifyOTPScreen, verifyOTPScreenLocators };
