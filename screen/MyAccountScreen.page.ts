const myAccountScreenLocators = {
  pageTitle:          () => $('//android.widget.TextView[@resource-id="mobile_navbar1_title"]'),
  backButton:         () => $('//android.view.ViewGroup[@resource-id="mobile_navbar1_backBtn"]'),
  profileSection:     () => $('//android.view.ViewGroup[@resource-id="containerProfile_a"]'),
  fullNameText:       () => $('//android.widget.TextView[@resource-id="labelFullName_caption"]'),
  emailText:          () => $('//android.widget.TextView[@resource-id="labelEmail_caption"]'),
  mobileText:         () => $('//android.widget.TextView[@resource-id="labelMobile_caption"]'),
  editProfileButton:  () => $('//android.widget.TextView[@resource-id="btnEditProfile_caption"]'),
  ordersSection:      () => $('//android.view.ViewGroup[@resource-id="containerOrders_a"]'),
  viewOrdersButton:   () => $('//android.widget.TextView[@resource-id="btnViewOrders_caption"]'),
  addressSection:     () => $('//android.view.ViewGroup[@resource-id="containerAddress_a"]'),
  logoutButton:       () => $('//android.widget.TextView[@resource-id="btnLogout_caption"]'),
  changePasswordBtn:  () => $('//android.widget.TextView[@resource-id="btnChangePassword_caption"]'),
};

class MyAccountScreen {
  async waitForMyAccountLoaded(timeoutMs = 20000) {
    await driver.waitUntil(
      async () =>
        (await myAccountScreenLocators.profileSection().isDisplayed().catch(() => false)) ||
        (await myAccountScreenLocators.fullNameText().isDisplayed().catch(() => false)) ||
        (await myAccountScreenLocators.logoutButton().isDisplayed().catch(() => false)),
      { timeout: timeoutMs, interval: 500, timeoutMsg: 'My Account screen did not load' },
    );
  }

  async verifyMyAccountScreenDisplayed() {
    await this.waitForMyAccountLoaded();
    await expect(myAccountScreenLocators.pageTitle()).toBeDisplayed();
  }

  async tapEditProfileButton() {
    await myAccountScreenLocators.editProfileButton().waitForDisplayed();
    await myAccountScreenLocators.editProfileButton().click();
  }

  async tapViewOrdersButton() {
    await myAccountScreenLocators.viewOrdersButton().waitForDisplayed();
    await myAccountScreenLocators.viewOrdersButton().click();
  }

  async tapLogoutButton() {
    await myAccountScreenLocators.logoutButton().waitForDisplayed();
    await myAccountScreenLocators.logoutButton().click();
  }

  async tapChangePasswordButton() {
    await myAccountScreenLocators.changePasswordBtn().waitForDisplayed();
    await myAccountScreenLocators.changePasswordBtn().click();
  }

  async tapBackButton() {
    await myAccountScreenLocators.backButton().waitForDisplayed();
    await myAccountScreenLocators.backButton().click();
  }

  async verifyUserEmailDisplayed(expectedEmail: string) {
    await expect(myAccountScreenLocators.emailText()).toHaveText(expectedEmail);
  }

  async scrollDown() {
    await driver.execute('mobile: scrollGesture', {
      left: 100, top: 300, width: 300, height: 600,
      direction: 'down',
      percent: 2.0,
    });
  }
}

const myAccountScreen = new MyAccountScreen();

export { myAccountScreen, myAccountScreenLocators };
