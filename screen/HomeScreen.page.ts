import { permissionScreen } from "./PermissionScreen.page";

const homeScreenLocators = {
  blinkWirelessLogo: () => $('//android.widget.ImageView[@content-desc="pictureLogo_picture"]'),
  loginButton: () => $('//android.widget.TextView[@resource-id="anchorLogin_caption"]'),
  iPhoneProductImage: () => $('//android.widget.ImageView[@content-desc="pictureMobile_picture"]'),
  mainHeading: () => $('//android.widget.TextView[@resource-id="labelMain_caption"]'),
  subtextHeading: () => $('//android.widget.TextView[@resource-id="labelSubtext_caption"]'),
  shopPhoneButton: () => $('//android.widget.TextView[@resource-id="buttonShopProducts_caption"]'),
  byopSection: () => $('//android.widget.TextView[@resource-id="label3_caption"]'),
  broadbandSection: () => $('//android.widget.TextView[@resource-id="label5_caption"]'),
  phoneIcon: () => $('//android.widget.ImageView[@content-desc="picture3_picture"]'),
  routerIcon: () => $('//android.widget.ImageView[@content-desc="picture4_picture"]')
};

class HomeScreen {
  async launchApp() {
    await permissionScreen.launchApp();
    try {
      await permissionScreen.verifyPermissionDialogDisplayed();
      await permissionScreen.tapAllowButton();
    } catch (e) {
      // Permission dialog may not appear if already granted
    }
  }

  async verifyHomeScreenDisplayed() {
    await homeScreenLocators.blinkWirelessLogo().waitForDisplayed({ timeout: 10000 });
    await homeScreenLocators.loginButton().waitForDisplayed();
    await expect(homeScreenLocators.mainHeading()).toHaveText('One-Stop shop for All Your Mobile Needs');
  }

  async tapLoginButton() {
    await homeScreenLocators.loginButton().waitForDisplayed();
    await homeScreenLocators.loginButton().click();
  }

  async tapShopPhoneButton() {
    await homeScreenLocators.shopPhoneButton().waitForDisplayed();
    await homeScreenLocators.shopPhoneButton().click();
  }

  async tapBYOPSection() {
    await homeScreenLocators.byopSection().waitForDisplayed();
    await homeScreenLocators.byopSection().click();
  }

  async tapBroadbandSection() {
    await homeScreenLocators.broadbandSection().waitForDisplayed();
    await homeScreenLocators.broadbandSection().click();
  }

  async tapPhoneIcon() {
    await homeScreenLocators.phoneIcon().waitForDisplayed();
    await homeScreenLocators.phoneIcon().click();
  }

  async tapRouterIcon() {
    await homeScreenLocators.routerIcon().waitForDisplayed();
    await homeScreenLocators.routerIcon().click();
  }

  async scrollToFindElement(elementLocator) {
    await driver.execute('mobile: scrollGesture', {
      left: 100, top: 100, width: 200, height: 200,
      direction: 'down',
      percent: 3.0
    });
    await elementLocator().waitForDisplayed();
  }
}

const homeScreen = new HomeScreen();

export { homeScreen, homeScreenLocators };