const permissionscreenScreenLocators = {
  permissionMessage: () =>
    $(
      '//android.widget.TextView[@resource-id="com.android.permissioncontroller:id/permission_message"]'
    ),
  bellIcon: () =>
    $(
      '//android.widget.ImageView[@resource-id="com.android.permissioncontroller:id/permission_icon"]'
    ),
  allowButton: () =>
    $(
      '//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]'
    ),
  dontAllowButton: () =>
    $(
      '//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]'
    ),
};

class PermissionScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await driver.pause(2000);
  }

  async verifyPermissionDialogDisplayed() {
    await permissionscreenScreenLocators.permissionMessage().waitForDisplayed();
    await permissionscreenScreenLocators.allowButton().waitForDisplayed();
    await permissionscreenScreenLocators.dontAllowButton().waitForDisplayed();
  }

  async tapAllowButton() {
    await permissionscreenScreenLocators.allowButton().waitForDisplayed();
    await permissionscreenScreenLocators.allowButton().click();
  }

  async tapDontAllowButton() {
    await permissionscreenScreenLocators.dontAllowButton().waitForDisplayed();
    await permissionscreenScreenLocators.dontAllowButton().click();
  }

  async verifyPermissionDialogClosed() {
    await permissionscreenScreenLocators.permissionMessage().waitForDisplayed({ reverse: true });
  }
}

const permissionscreenScreen = new PermissionScreen();

export { permissionscreenScreen, permissionscreenScreenLocators };
