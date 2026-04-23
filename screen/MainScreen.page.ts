const mainScreenLocators = {
  blinkWirelessLogo: () => $('~pictureLogo_picture'),
  loginButton: () => $('~anchorLogin_caption'),
  iphoneImage: () => $('~pictureMobile_picture'),
  oneStopShopHeading: () => $('~labelMain_caption'),
  findCompareText: () => $('~labelSubtext_caption'),
  shopPhoneButton: () => $('~buttonShopProducts_caption'),
  bringYourOwnPhoneSection: () => $('~label3_caption'),
  shopBroadbandsSection: () => $('~label5_caption'),
  phoneIcon: () => $('~picture3_picture'),
  routerIcon: () => $('~picture4_picture')
};

class MainScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await driver.pause(2000);
  }

  async verifyMainScreenDisplayed() {
    await mainScreenLocators.blinkWirelessLogo().waitForDisplayed();
    await mainScreenLocators.loginButton().waitForDisplayed();
    await mainScreenLocators.shopPhoneButton().waitForDisplayed();
  }

  async tapLoginButton() {
    await mainScreenLocators.loginButton().waitForDisplayed();
    await mainScreenLocators.loginButton().click();
  }

  async scrollToShopPhoneButton() {
    await driver.execute('mobile: scroll', { direction: 'down' });
    await mainScreenLocators.shopPhoneButton().waitForDisplayed();
  }

  async tapShopPhoneButton() {
    await this.scrollToShopPhoneButton();
    await mainScreenLocators.shopPhoneButton().click();
  }

  async scrollToBringYourOwnPhoneSection() {
    await driver.execute('mobile: scroll', { direction: 'down' });
    await mainScreenLocators.bringYourOwnPhoneSection().waitForDisplayed();
  }

  async tapBringYourOwnPhoneSection() {
    await this.scrollToBringYourOwnPhoneSection();
    await mainScreenLocators.bringYourOwnPhoneSection().click();
  }

  async scrollToShopBroadbandsSection() {
    await driver.execute('mobile: scroll', { direction: 'down' });
    await mainScreenLocators.shopBroadbandsSection().waitForDisplayed();
  }

  async tapShopBroadbandsSection() {
    await this.scrollToShopBroadbandsSection();
    await mainScreenLocators.shopBroadbandsSection().click();
  }

  async verifyShopPhoneButtonText() {
    await this.scrollToShopPhoneButton();
    const buttonText = await mainScreenLocators.shopPhoneButton().getText();
    expect(buttonText).toBe('Shop Phone');
  }

  async verifyBringYourOwnPhoneSectionVisible() {
    await this.scrollToBringYourOwnPhoneSection();
    await mainScreenLocators.phoneIcon().waitForDisplayed();
  }

  async verifyShopBroadbandsSectionVisible() {
    await this.scrollToShopBroadbandsSection();
    await mainScreenLocators.routerIcon().waitForDisplayed();
  }
}

const mainScreen = new MainScreen();

export { mainScreen, mainScreenLocators };