const homeScreenLocators = {
  blinkWirelessLogo: () => $('~pictureLogo_picture'),
  loginButton: () => $('~anchorLogin_caption'),
  iPhoneProductImage: () => $('~pictureMobile_picture'),
  mainHeading: () => $('~labelMain_caption'),
  subtextHeading: () => $('~labelSubtext_caption'),
  shopPhoneButton: () => $('~buttonShopProducts_caption'),
  bringYourOwnPhoneIcon: () => $('~picture3_picture'),
  bringYourOwnPhoneText: () => $('~label3_caption'),
  shopBroadbandsIcon: () => $('~picture4_picture'),
  shopBroadbandsText: () => $('~label5_caption')
};

class HomeScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await driver.pause(2000);
  }

  async verifyHomeScreenDisplayed() {
    await homeScreenLocators.blinkWirelessLogo().waitForDisplayed();
    await homeScreenLocators.loginButton().waitForDisplayed();
    await homeScreenLocators.mainHeading().waitForDisplayed();
    await homeScreenLocators.shopPhoneButton().waitForDisplayed();
  }

  async tapBlinkWirelessLogo() {
    await homeScreenLocators.blinkWirelessLogo().waitForDisplayed();
    await homeScreenLocators.blinkWirelessLogo().click();
  }

  async tapLoginButton() {
    await homeScreenLocators.loginButton().waitForDisplayed();
    await homeScreenLocators.loginButton().click();
  }

  async tapShopPhoneButton() {
    await homeScreenLocators.shopPhoneButton().waitForDisplayed();
    await homeScreenLocators.shopPhoneButton().click();
  }

  async tapBringYourOwnPhoneSection() {
    await homeScreenLocators.bringYourOwnPhoneIcon().waitForDisplayed();
    await homeScreenLocators.bringYourOwnPhoneIcon().click();
  }

  async tapBringYourOwnPhoneText() {
    await homeScreenLocators.bringYourOwnPhoneText().waitForDisplayed();
    await homeScreenLocators.bringYourOwnPhoneText().click();
  }

  async tapShopBroadbandsSection() {
    await homeScreenLocators.shopBroadbandsIcon().waitForDisplayed();
    await homeScreenLocators.shopBroadbandsIcon().click();
  }

  async tapShopBroadbandsText() {
    await homeScreenLocators.shopBroadbandsText().waitForDisplayed();
    await homeScreenLocators.shopBroadbandsText().click();
  }
}

const homeScreen = new HomeScreen();

export { homeScreen, homeScreenLocators };