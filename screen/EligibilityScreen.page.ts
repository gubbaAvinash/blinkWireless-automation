const eligibilityScreenLocators = {
  closeButton: () => $('~mobile_navbar1_backbtn_a'),
  mobileNumberField: () => $('~enterPhoneNumber_i'),
  checkEligibilityButton: () => $('~btnCheckEligibility_a')
};

class EligibilityScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await driver.pause(2000);
  }

  async navigateToEligibilityScreen() {
    await this.launchApp();
    // Add navigation steps to reach eligibility screen
    await eligibilityScreenLocators.mobileNumberField().waitForDisplayed({ timeout: 10000 });
  }

  async verifyEligibilityScreenDisplayed() {
    await eligibilityScreenLocators.mobileNumberField().waitForDisplayed();
    await eligibilityScreenLocators.checkEligibilityButton().waitForDisplayed();
  }

  async enterMobileNumber(phoneNumber: string) {
    await eligibilityScreenLocators.mobileNumberField().waitForDisplayed();
    await eligibilityScreenLocators.mobileNumberField().click();
    await eligibilityScreenLocators.mobileNumberField().setValue(phoneNumber);
  }

  async tapCheckEligibilityButton() {
    await eligibilityScreenLocators.checkEligibilityButton().waitForDisplayed();
    await eligibilityScreenLocators.checkEligibilityButton().click();
  }

  async tapCloseButton() {
    await eligibilityScreenLocators.closeButton().waitForDisplayed();
    await eligibilityScreenLocators.closeButton().click();
  }

  async longPressMobileNumberField() {
    await eligibilityScreenLocators.mobileNumberField().waitForDisplayed();
    await driver.touchAction([
      { action: 'longPress', element: eligibilityScreenLocators.mobileNumberField() }
    ]);
  }

  async clearMobileNumberField() {
    await eligibilityScreenLocators.mobileNumberField().waitForDisplayed();
    await eligibilityScreenLocators.mobileNumberField().click();
    await eligibilityScreenLocators.mobileNumberField().clearValue();
  }
}

const eligibilityScreen = new EligibilityScreen();

export { eligibilityScreen, eligibilityScreenLocators };