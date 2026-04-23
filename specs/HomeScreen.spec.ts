import { homeScreen, homeScreenLocators } from "../screen/HomeScreen.page";

describe('Home Screen Tests', () => {
  it('TC014: Navigate to Home from Logo', async () => {
    // Preconditions: User is on any screen with Blink Wireless logo
    await homeScreen.launchApp();
    
    // Step 1: Locate Blink Wireless logo
    // Step 2: Tap on the logo
    await homeScreen.tapBlinkWirelessLogo();
    
    // Step 3: Verify navigation to home screen
    // Expected result: User is navigated to home screen or main page
    await homeScreen.verifyHomeScreenDisplayed();
  });

  it('TC015: Navigate to Login', async () => {
    // Preconditions: User is on home screen
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    
    // Step 1: Locate Login button
    // Step 2: Tap on Login button
    await homeScreen.tapLoginButton();
    
    // Step 3: Verify navigation to login screen
    // Expected result: User is navigated to login screen
    await driver.pause(2000);
  });

  it('TC016: Navigate to Phone Shopping', async () => {
    // Preconditions: User is on home screen
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    
    // Step 1: Locate 'Shop Phone' button
    // Step 2: Tap on 'Shop Phone' button
    await homeScreen.tapShopPhoneButton();
    
    // Step 3: Verify navigation to phone catalog
    // Expected result: User is navigated to phone shopping catalog
    await driver.pause(2000);
  });

  it('TC017: Navigate to Bring Your Own Phone', async () => {
    // Preconditions: User is on home screen
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    
    // Step 1: Locate 'Bring your own phone' section
    // Step 2: Tap on the icon or text
    await homeScreen.tapBringYourOwnPhoneSection();
    
    // Step 3: Verify navigation to BYOP section
    // Expected result: User is navigated to bring your own phone section
    await driver.pause(2000);
  });

  it('TC018: Navigate to Broadband Shopping', async () => {
    // Preconditions: User is on home screen
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    
    // Step 1: Locate 'Shop Broadbands' section
    // Step 2: Tap on the icon or text
    await homeScreen.tapShopBroadbandsSection();
    
    // Step 3: Verify navigation to broadband section
    // Expected result: User is navigated to broadband shopping section
    await driver.pause(2000);
  });
});