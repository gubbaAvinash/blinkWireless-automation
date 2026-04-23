import { simTypeScreen } from "./SimTypeScreen.page";

const personalDetailsScreenLocators = {
  backArrow: () => $('~mobile_navbar1_backbtn_a'),
  progressIndicator: () => $('~mobile_navbar1_backbtn_caption'),
  personalDetailsHeader: () => $('~mobile_navbar1_title'),
  cancelButton: () => $('~cancelBtn_caption'),
  instructionText: () => $('~label59_caption'),
  nameField: () => $('~name_i'),
  emailField: () => $('~emailId_i'),
  phoneField: () => $('~phone_i'),
  totalPrice: () => $('~label1_caption'),
  orderDetailsDropdown: () => $('~label42_2_caption'),
  continueButton: () => $('~wizardcontinuebtn_caption')
};

class PersonalDetailsScreen {
  async navigateToPersonalDetailsScreen() {
    await simTypeScreen.navigateToSimTypeScreen();
    await simTypeScreen.selectPhysicalSim();
    await simTypeScreen.tapContinueButton();
    await personalDetailsScreenLocators.personalDetailsHeader().waitForDisplayed();
  }

  async verifyPersonalDetailsScreenDisplayed() {
    await personalDetailsScreenLocators.personalDetailsHeader().waitForDisplayed();
    await expect(personalDetailsScreenLocators.personalDetailsHeader()).toHaveText('Personal Details');
    await expect(personalDetailsScreenLocators.progressIndicator()).toHaveText('4/6');
  }

  async enterName(name: string) {
    await personalDetailsScreenLocators.nameField().waitForDisplayed();
    await personalDetailsScreenLocators.nameField().clearValue();
    await personalDetailsScreenLocators.nameField().setValue(name);
  }

  async enterEmail(email: string) {
    await personalDetailsScreenLocators.emailField().waitForDisplayed();
    await personalDetailsScreenLocators.emailField().clearValue();
    await personalDetailsScreenLocators.emailField().setValue(email);
  }

  async enterPhone(phone: string) {
    await personalDetailsScreenLocators.phoneField().waitForDisplayed();
    await personalDetailsScreenLocators.phoneField().clearValue();
    await personalDetailsScreenLocators.phoneField().setValue(phone);
  }

  async clearAllFields() {
    await personalDetailsScreenLocators.nameField().clearValue();
    await personalDetailsScreenLocators.emailField().clearValue();
    await personalDetailsScreenLocators.phoneField().clearValue();
  }

  async longPressNameField() {
    await personalDetailsScreenLocators.nameField().waitForDisplayed();
    await personalDetailsScreenLocators.nameField().touchAction([
      { action: 'longPress', x: 500, y: 677 }
    ]);
  }

  async tapBackArrow() {
    await personalDetailsScreenLocators.backArrow().waitForDisplayed();
    await personalDetailsScreenLocators.backArrow().click();
  }

  async tapCancelButton() {
    await personalDetailsScreenLocators.cancelButton().waitForDisplayed();
    await personalDetailsScreenLocators.cancelButton().click();
  }

  async tapContinueButton() {
    await personalDetailsScreenLocators.continueButton().waitForDisplayed();
    await personalDetailsScreenLocators.continueButton().click();
  }

  async tapOrderDetails() {
    await personalDetailsScreenLocators.orderDetailsDropdown().waitForDisplayed();
    await personalDetailsScreenLocators.orderDetailsDropdown().click();
  }

  async getTotalPrice() {
    await personalDetailsScreenLocators.totalPrice().waitForDisplayed();
    return await personalDetailsScreenLocators.totalPrice().getText();
  }
}

const personalDetailsScreen = new PersonalDetailsScreen();

export { personalDetailsScreen, personalDetailsScreenLocators };