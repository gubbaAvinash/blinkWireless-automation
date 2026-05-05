import { permissionscreenScreen } from '../screen/PermissionScreen.page';

describe('Permission Screen Tests', () => {
  it('TC076: Grant permission - Allow button', async () => {
    await permissionscreenScreen.launchApp();
    await permissionscreenScreen.verifyPermissionDialogDisplayed();
    await permissionscreenScreen.tapAllowButton();
    await permissionscreenScreen.verifyPermissionDialogClosed();
  });

  it('TC077: Deny permission - Don\'t allow button', async () => {
    await permissionscreenScreen.launchApp();
    await permissionscreenScreen.verifyPermissionDialogDisplayed();
    await permissionscreenScreen.tapDontAllowButton();
    await permissionscreenScreen.verifyPermissionDialogClosed();
  });
});
