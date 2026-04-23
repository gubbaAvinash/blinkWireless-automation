import { portingEligibilityLocators } from "./PortingEligibilityScreen.page";

const portingEligibilityLocators = {
  pageTitle: () => $('~mobile_navbar1_title'),
  instructionText: () => $('~lblDetailsPortEligibilityCheck_caption'),
  phoneNumberLabel: () => $('~enterPhoneNumber_formLabel_caption'),
  phoneNumberInput: () => $('~enterPhoneNumber_i'),
  carrierDropdown: () => $('~containerCarrrier_a'),
  carrierSelection: () => $('~label6_caption'),
  accountNumberLabel: () => $('~accountNumber_formLabel_caption'),
  accountNumberInput: () => $('~accountNumber_i'),
  helpText: () => $('~label5_caption'),
  checkEligibilityButton: () => $('~btnCheckEligibility_caption')
};

class PortingEligibilityScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await this.waitForScreenToLoad();
  }

  async waitForScreenToLoad() {
    await portingEligibilityLocators.pageTitle().waitForDisplayed({ timeout: 10000 });
  }

  async verifyPortingEligibilityScreenDisplayed() {
    await expect(portingEligibilityLocators.pageTitle()).toHaveText('Porting Check Eligibility');
    await expect(portingEligibilityLocators.instructionText()).toBeDisplayed();
  }

  async enterPhoneNumber(phoneNumber: string) {
    await portingEligibilityLocators.phoneNumberInput().waitForDisplayed();
    await portingEligibilityLocators.phoneNumberInput().clearValue();
    await portingEligibilityLocators.phoneNumberInput().setValue(phoneNumber);
  }

  async clearPhoneNumber() {
    await portingEligibilityLocators.phoneNumberInput().clearValue();
  }

  async tapPhoneNumberField() {
    await portingEligibilityLocators.phoneNumberInput().click();
  }

  async longPressPhoneNumberField() {
    await portingEligibilityLocators.phoneNumberInput().touchAction([
      { action: 'longPress', x: 500, y: 635 }
    ]);
  }

  async selectCarrier(carrier: string) {
    await portingEligibilityLocators.carrierDropdown().click();
    await portingEligibilityLocators.carrierSelection().waitForDisplayed();
  }

  async enterAccountNumber(accountNumber: string) {
    await portingEligibilityLocators.accountNumberInput().waitForDisplayed();
    await portingEligibilityLocators.accountNumberInput().clearValue();
    await portingEligibilityLocators.accountNumberInput().setValue(accountNumber);
  }

  async clearAccountNumber() {
    await portingEligibilityLocators.accountNumberInput().clearValue();
  }

  async tapAccountNumberField() {
    await portingEligibilityLocators.accountNumberInput().click();
  }

  async longPressAccountNumberField() {
    await portingEligibilityLocators.accountNumberInput().touchAction([
      { action: 'longPress', x: 500, y: 1044 }
    ]);
  }

  async tapCheckEligibilityButton() {
    await portingEligibilityLocators.checkEligibilityButton().click();
  }

  async verifyPhoneNumberDisplayed(expectedNumber: string) {
    await expect(portingEligibilityLocators.phoneNumberInput()).toHaveValue(expectedNumber);
  }

  async verifyAccountNumberDisplayed(expectedNumber: string) {
    await expect(portingEligibilityLocators.accountNumberInput()).toHaveValue(expectedNumber);
  }

  async verifyCarrierSelected(carrier: string) {
    await expect(portingEligibilityLocators.carrierSelection()).toHaveText(carrier);
  }

  async getPhoneNumberValue() {
    return await portingEligibilityLocators.phoneNumberInput().getValue();
  }

  async getAccountNumberValue() {
    return await portingEligibilityLocators.accountNumberInput().getValue();
  }
}

const portingEligibilityScreen = new PortingEligibilityScreen();

export { portingEligibilityScreen, portingEligibilityLocators };