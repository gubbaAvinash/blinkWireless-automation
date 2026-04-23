import { homeScreen } from "./HomeScreen.page";

const portabilityCheckLocators = {
  blinkWirelessLogo: () => $('//android.widget.ImageView[@content-desc="picture2_picture"]'),
  closeButton: () => $('//android.view.ViewGroup[@resource-id="button5_a"]'),
  switchNetworkHeading: () => $('//android.widget.TextView[@resource-id="label3_caption"]'),
  findCompareText: () => $('//android.widget.TextView[@resource-id="label4_caption"]'),
  mobileNumberLabel: () => $('//android.widget.TextView[@resource-id="portRequestNumber_formLabel_caption"]'),
  mobileNumberInput: () => $('//android.widget.EditText[@resource-id="portRequestNumber_i"]'),
  zipCodeLabel: () => $('//android.widget.TextView[@resource-id="serviceZipCode_formLabel_caption"]'),
  zipCodeInput: () => $('//android.widget.EditText[@resource-id="serviceZipCode_i"]'),
  checkEligibilityButton: () => $('//android.widget.TextView[@resource-id="Checkeligibilitybtn_caption"]'),
  skipPortabilityButton: () => $('//android.widget.TextView[@resource-id="button3_caption"]')
};

class PortabilityCheckScreen {
  async navigateToPortabilityCheck() {
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapBYOPSection();
    await portabilityCheckLocators.switchNetworkHeading().waitForDisplayed();
  }

  async verifyPortabilityScreenDisplayed() {
    await portabilityCheckLocators.switchNetworkHeading().waitForDisplayed();
    await expect(portabilityCheckLocators.switchNetworkHeading()).toHaveText('Switch to a superior network with your existing number');
  }

  async clearAndEnterMobileNumber(mobileNumber) {
    await portabilityCheckLocators.mobileNumberInput().waitForDisplayed();
    await portabilityCheckLocators.mobileNumberInput().click();
    await portabilityCheckLocators.mobileNumberInput().clearValue();
    await portabilityCheckLocators.mobileNumberInput().setValue(mobileNumber);
  }

  async clearAndEnterZipCode(zipCode) {
    await portabilityCheckLocators.zipCodeInput().waitForDisplayed();
    await portabilityCheckLocators.zipCodeInput().click();
    await portabilityCheckLocators.zipCodeInput().clearValue();
    await portabilityCheckLocators.zipCodeInput().setValue(zipCode);
  }

  async tapCheckEligibilityButton() {
    await portabilityCheckLocators.checkEligibilityButton().waitForDisplayed();
    await portabilityCheckLocators.checkEligibilityButton().click();
  }

  async tapSkipPortabilityButton() {
    await portabilityCheckLocators.skipPortabilityButton().waitForDisplayed();
    await portabilityCheckLocators.skipPortabilityButton().click();
  }

  async tapCloseButton() {
    await portabilityCheckLocators.closeButton().waitForDisplayed();
    await portabilityCheckLocators.closeButton().click();
  }

  async verifyMobileNumberDisplayed(expectedNumber) {
    await expect(portabilityCheckLocators.mobileNumberInput()).toHaveValue(expectedNumber);
  }

  async verifyZipCodeDisplayed(expectedZipCode) {
    await expect(portabilityCheckLocators.zipCodeInput()).toHaveValue(expectedZipCode);
  }

  async longPressMobileNumberField() {
    const input = await portabilityCheckLocators.mobileNumberInput();
    await input.waitForDisplayed();
    await driver.touchAction([
      { action: 'longPress', element: input as unknown as WebdriverIO.Element },
      { action: 'release' },
    ]);
  }
}

const portabilityCheckScreen = new PortabilityCheckScreen();

export { portabilityCheckScreen, portabilityCheckLocators };