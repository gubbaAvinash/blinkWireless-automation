import { notificationPermissionScreen, notificationPermissionLocators } from "../screen/NotificationPermissionScreen.page";

describe('Notification Permission Screen Tests', () => {
  it('TC001: Grant notification permission - Allow button', async () => {
    // Preconditions: BlinkWireless app is installed, Notification permission dialog is displayed
    await notificationPermissionScreen.launchApp();
    
    // Step 1: Launch BlinkWireless app
    // Step 2: Observe notification permission dialog appears
    await notificationPermissionScreen.verifyPermissionDialogDisplayed();
    
    // Step 3: Tap on 'Allow' button
    await notificationPermissionScreen.tapAllowButton();
    
    // Expected result: Notification permission is granted to BlinkWireless app and dialog closes, returning to app main screen
    await notificationPermissionScreen.verifyPermissionDialogClosed();
  });

  it('TC002: Deny notification permission - Don\'t allow button', async () => {
    // Preconditions: BlinkWireless app is installed, Notification permission dialog is displayed
    await notificationPermissionScreen.launchApp();
    
    // Step 1: Launch BlinkWireless app
    // Step 2: Observe notification permission dialog appears
    await notificationPermissionScreen.verifyPermissionDialogDisplayed();
    
    // Step 3: Tap on 'Don't allow' button
    await notificationPermissionScreen.tapDontAllowButton();
    
    // Expected result: Notification permission is denied to BlinkWireless app and dialog closes, returning to app main screen
    await notificationPermissionScreen.verifyPermissionDialogClosed();
  });
});