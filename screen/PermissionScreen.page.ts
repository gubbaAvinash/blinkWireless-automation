const permissionScreenLocators = {
  notificationIcon: () => $('//android.widget.ImageView[@resource-id="com.android.permissioncontroller:id/permission_icon"]'),
  permissionMessage: () => $('//android.widget.TextView[@resource-id="com.android.permissioncontroller:id/permission_message"]'),
  allowButton: () => $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]'),
  dontAllowButton: () => $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]')
};

class PermissionScreen {
  async launchApp() {
    await driver.terminateApp('com.wavemaker.turbomobiles');
    await driver.activateApp('com.wavemaker.turbomobiles');
    await driver.pause(2000);
  }

  async verifyPermissionDialogDisplayed() {
    const wait = { timeout: 10000 };
    await permissionScreenLocators.notificationIcon().waitForDisplayed(wait);
    await permissionScreenLocators.permissionMessage().waitForDisplayed(wait);
    await expect(permissionScreenLocators.permissionMessage()).toHaveText(
      'Allow BlinkWireless to send you notifications?',
    );
    await permissionScreenLocators.allowButton().waitForDisplayed(wait);
    await permissionScreenLocators.dontAllowButton().waitForDisplayed(wait);
    await expect(permissionScreenLocators.allowButton()).toHaveText('Allow');
    await expect(permissionScreenLocators.dontAllowButton()).toHaveText("Don't allow");
  }

  async tapAllowButton() {
    await permissionScreenLocators.allowButton().waitForDisplayed();
    await permissionScreenLocators.allowButton().click();
  }

  async tapDontAllowButton() {
    await permissionScreenLocators.dontAllowButton().waitForDisplayed();
    await permissionScreenLocators.dontAllowButton().click();
  }

  async verifyPermissionDialogClosed() {
    await permissionScreenLocators.permissionMessage().waitForDisplayed({ reverse: true, timeout: 5000 });
  }
}

const permissionScreen = new PermissionScreen();

export { permissionScreen, permissionScreenLocators };