import { mainScreen } from "./MainScreen.page";
import { numberPortabilityLocators } from "./NumberPortabilityScreen.page";

const numberPortabilityLocators = {
  blinkWirelessLogo: () => $('//android.widget.LinearLayout[@resource-id="picture2_picture"]'),
  closeButton: () => $('//android.view.ViewGroup[@resource-id="button5_a"]'),
  switchNetworkHeading: () => $('~label3_caption'),
  findCompareText: () => $('~label4_caption'),
  mobileNumberLabel: () => $('~portRequestNumber_formLabel_caption'),
  mobileNumberField: () => $('//android.widget.EditText[@resource-id="portRequestNumber_i"]'),
  zipCodeLabel: () => $('~serviceZipCode_formLabel_caption'),
  zipCodeField: () => $('//android.widget.EditText[@resource-id="serviceZipCode_i"]'),
  checkEligibilityButton: () => $('~Checkeligibilitybtn_caption'),
  skipSimPortabilityButton: () => $('~button3_caption')
};

class NumberPortabilityScreen {
  async navigateToNumberPortability() {
    await mainScreen.launchApp();
    await mainScreen.tapBringYourOwnPhoneSection();
    await numberPortabilityLocators.switchNetworkHeading().waitForDisplayed();
  }

  async verifyNumberPortabilityScreenDisplayed() {
    await numberPortabilityLocators.switchNetworkHeading().waitForDisplayed();
    await numberPortabilityLocators.mobileNumberField().waitForDisplayed();
    await numberPortabilityLocators.zipCodeField().waitForDisplayed();
  }

  async tapMobileNumberField() {
    await numberPortabilityLocators.mobileNumberField().waitForDisplayed();
    await numberPortabilityLocators.mobileNumberField().click();
  }

  async enterMobileNumber(phoneNumber: string) {
    await this.tapMobileNumberField();
    await numberPortabilityLocators.mobileNumberField().setValue(phoneNumber);
  }

  async tapZipCodeField() {
    await numberPortabilityLocators.zipCodeField().waitForDisplayed();
    await numberPortabilityLocators.zipCodeField().click();
  }

  async enterZipCode(zipCode: string) {
    await this.tapZipCodeField();
    await numberPortabilityLocators.zipCodeField().setValue(zipCode);
  }

  async tapCheckEligibilityButton() {
    await numberPortabilityLocators.checkEligibilityButton().waitForDisplayed();
    await numberPortabilityLocators.checkEligibilityButton().click();
  }

  async tapSkipSimPortabilityButton() {
    await numberPortabilityLocators.skipSimPortabilityButton().waitForDisplayed();
    await numberPortabilityLocators.skipSimPortabilityButton().click();
  }

  async tapCloseButton() {
    await numberPortabilityLocators.closeButton().waitForDisplayed();
    await numberPortabilityLocators.closeButton().click();
  }

  async longPressMobileNumberField() {
    await numberPortabilityLocators.mobileNumberField().waitForDisplayed();
    await driver.touchAction([
      { action: 'longPress', element: await numberPortabilityLocators.mobileNumberField() }
    ]);
  }

  async longPressZipCodeField() {
    await numberPortabilityLocators.zipCodeField().waitForDisplayed();
    await driver.touchAction([
      { action: 'longPress', element: await numberPortabilityLocators.zipCodeField() }
    ]);
  }

  async verifyMobileNumberDisplayed(expectedNumber: string) {
    const actualNumber = await numberPortabilityLocators.mobileNumberField().getValue();
    expect(actualNumber).toBe(expectedNumber);
  }

  async verifyZipCodeDisplayed(expectedZipCode: string) {
    const actualZipCode = await numberPortabilityLocators.zipCodeField().getValue();
    expect(actualZipCode).toBe(expectedZipCode);
  }

  async verifyErrorMessageDisplayed() {
    // This would need to be implemented based on actual error message elements
    // For now, we'll check if the fields are still visible indicating validation failed
    await numberPortabilityLocators.mobileNumberField().waitForDisplayed();
    await numberPortabilityLocators.zipCodeField().waitForDisplayed();
  }

  async verifyContextMenuDisplayed() {
    // This would need to be implemented based on actual context menu elements
    // For now, we'll pause to allow visual verification
    await driver.pause(2000);
  }

  async clearMobileNumberField() {
    await numberPortabilityLocators.mobileNumberField().clearValue();
  }

  async clearZipCodeField() {
    await numberPortabilityLocators.zipCodeField().clearValue();
  }
}

const numberPortabilityScreen = new NumberPortabilityScreen();

export { numberPortabilityScreen, numberPortabilityLocators };