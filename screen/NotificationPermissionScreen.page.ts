import { notificationPermissionLocators } from "./NotificationPermissionScreen.page";

const notificationPermissionLocators = {
  permissionMessage: () => $('//android.widget.TextView[@resource-id="com.android.permissioncontroller:id/permission_message"]'),
  bellIcon: () => $('//android.widget.ImageView[@resource-id="com.android.permissioncontroller:id/permission_icon"]'),
  allowButton: () => $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]'),
  dontAllowButton: () => $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]')
};

class NotificationPermissionScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await driver.pause(2000);
  }

  async verifyPermissionDialogDisplayed() {
    await notificationPermissionLocators.permissionMessage().waitForDisplayed();
    await notificationPermissionLocators.allowButton().waitForDisplayed();
    await notificationPermissionLocators.dontAllowButton().waitForDisplayed();
  }

  async tapAllowButton() {
    await notificationPermissionLocators.allowButton().waitForDisplayed();
    await notificationPermissionLocators.allowButton().click();
  }

  async tapDontAllowButton() {
    await notificationPermissionLocators.dontAllowButton().waitForDisplayed();
    await notificationPermissionLocators.dontAllowButton().click();
  }

  async verifyPermissionDialogClosed() {
    await notificationPermissionLocators.permissionMessage().waitForDisplayed({ reverse: true });
  }
}

const notificationPermissionScreen = new NotificationPermissionScreen();

export { notificationPermissionScreen, notificationPermissionLocators };