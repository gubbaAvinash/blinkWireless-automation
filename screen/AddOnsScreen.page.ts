const addOnsScreenLocators = {
  backArrow: () => $('~mobile_navbar1_backbtn_a'),
  progressIndicator: () => $('~mobile_navbar1_backbtn_caption'),
  addOnsTitle: () => $('~mobile_navbar1_title'),
  cancelButton: () => $('~cancelBtn_caption'),
  dataTab: () => $('~tabs1_headers_0_title'),
  roamingTab: () => $('~tabs1_headers_1_title'),
  contentTab: () => $('~tabs1_headers_2_title'),
  hboMaxLogo: () => $('~repeat_item_0_picture7_picture'),
  hboMaxText: () => $('~repeat_item_0_label18_caption'),
  hboMaxPrice: () => $('~repeat_item_0_label19_caption'),
  amazonPrimeLogo: () => $('~repeat_item_1_picture7_picture'),
  amazonPrimeText: () => $('~repeat_item_1_label18_caption'),
  amazonPrimeCheckmark: () => $('~repeat_item_1_icon4_icon'),
  huluLogo: () => $('~repeat_item_2_picture7_picture'),
  huluText: () => $('~repeat_item_2_label18_caption'),
  huluPrice: () => $('~repeat_item_2_label19_caption'),
  totalPrice: () => $('~label1_caption'),
  orderDetailsDropdown: () => $('~label42_2_caption'),
  continueButton: () => $('~wizardcontinuebtn_caption')
};

class AddOnsScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await addOnsScreenLocators.addOnsTitle().waitForDisplayed({ timeout: 10000 });
  }

  async verifyAddOnsScreenDisplayed() {
    await addOnsScreenLocators.addOnsTitle().waitForDisplayed();
    await expect(addOnsScreenLocators.addOnsTitle()).toHaveText('Add-Ons');
    await expect(addOnsScreenLocators.progressIndicator()).toHaveText('2/5');
  }

  async tapBackArrow() {
    await addOnsScreenLocators.backArrow().waitForDisplayed();
    await addOnsScreenLocators.backArrow().click();
  }

  async tapCancelButton() {
    await addOnsScreenLocators.cancelButton().waitForDisplayed();
    await addOnsScreenLocators.cancelButton().click();
  }

  async switchToRoamingTab() {
    await addOnsScreenLocators.roamingTab().waitForDisplayed();
    await addOnsScreenLocators.roamingTab().click();
  }

  async switchToContentTab() {
    await addOnsScreenLocators.contentTab().waitForDisplayed();
    await addOnsScreenLocators.contentTab().click();
  }

  async switchToDataTab() {
    await addOnsScreenLocators.dataTab().waitForDisplayed();
    await addOnsScreenLocators.dataTab().click();
  }

  async selectHBOMax() {
    await addOnsScreenLocators.hboMaxText().waitForDisplayed();
    await addOnsScreenLocators.hboMaxText().click();
  }

  async selectAmazonPrime() {
    await addOnsScreenLocators.amazonPrimeCheckmark().waitForDisplayed();
    await addOnsScreenLocators.amazonPrimeCheckmark().click();
  }

  async selectHulu() {
    await addOnsScreenLocators.huluText().waitForDisplayed();
    await addOnsScreenLocators.huluText().click();
  }

  async tapOrderDetails() {
    await addOnsScreenLocators.orderDetailsDropdown().waitForDisplayed();
    await addOnsScreenLocators.orderDetailsDropdown().click();
  }

  async tapContinueButton() {
    await addOnsScreenLocators.continueButton().waitForDisplayed();
    await addOnsScreenLocators.continueButton().click();
  }

  async getTotalPrice() {
    await addOnsScreenLocators.totalPrice().waitForDisplayed();
    return await addOnsScreenLocators.totalPrice().getText();
  }
}

const addOnsScreen = new AddOnsScreen();

export { addOnsScreen, addOnsScreenLocators };