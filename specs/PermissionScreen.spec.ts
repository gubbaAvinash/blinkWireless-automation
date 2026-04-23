import { permissionScreen, permissionScreenLocators } from '../screen/PermissionScreen.page';

/**
 * BlinkWireless — system notification permission dialog (Android permission UI).
 * Dialog: bell icon, title "Allow BlinkWireless to send you notifications?",
 * actions "Allow" and "Don't allow".
 */
describe('Permission Screen Tests', () => {
  it('TC001: Grant notification permission for BlinkWireless app', async () => {
    await permissionScreen.launchApp();

    await expect(permissionScreenLocators.notificationIcon()).toBeDisplayed();
    await permissionScreen.verifyPermissionDialogDisplayed();

    await permissionScreen.tapAllowButton();

    await permissionScreen.verifyPermissionDialogClosed();
  });

  it('TC002: Deny notification permission for BlinkWireless app', async () => {
    await permissionScreen.launchApp();

    await expect(permissionScreenLocators.notificationIcon()).toBeDisplayed();
    await permissionScreen.verifyPermissionDialogDisplayed();

    await permissionScreen.tapDontAllowButton();

    await permissionScreen.verifyPermissionDialogClosed();
  });
});
