import { personalDetailsScreen } from "./PersonalDetailsScreen.page";

const validationScreenLocators = {
  infoBanner: () => $('~label49_1_caption'),
  errorMessage: () => $('~zip_error_msg'),
  priceDisplay: () => $('~label1_caption'),
  orderDetailsDropdown: () => $('~containerOrderDetails_a'),
  continueButton: () => $('~wizardcontinuebtn_a')
};

class ValidationScreen {
  async navigateToValidationScreen() {
    await personalDetailsScreen.navigateToPersonalDetailsScreen();
    await personalDetailsScreen.enterName('Test User');
    await personalDetailsScreen.enterEmail('test@email.com');
    await personalDetailsScreen.enterPhone('1234567890');
    await personalDetailsScreen.tapContinueButton();
    await validationScreenLocators.errorMessage().waitForDisplayed();
  }

  async verifyErrorMessageDisplayed() {
    await validationScreenLocators.errorMessage().waitForDisplayed();
    await expect(validationScreenLocators.errorMessage()).toHaveText('Please enter valid zip code ');
  }

  async verifyInfoBannerDisplayed() {
    await validationScreenLocators.infoBanner().waitForDisplayed();
    await expect(validationScreenLocators.infoBanner()).toHaveText('Please tell us where you would like your phone to be delivered.');
  }

  async tapContinueButton() {
    await validationScreenLocators.continueButton().waitForDisplayed();
    await validationScreenLocators.continueButton().click();
  }

  async tapOrderDetails() {
    await validationScreenLocators.orderDetailsDropdown().waitForDisplayed();
    await validationScreenLocators.orderDetailsDropdown().click();
  }

  async getPriceDisplay() {
    await validationScreenLocators.priceDisplay().waitForDisplayed();
    return await validationScreenLocators.priceDisplay().getText();
  }
}

const validationScreen = new ValidationScreen();

export { validationScreen, validationScreenLocators };