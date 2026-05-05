import { homeScreen, homeScreenLocators } from "../screen/HomeScreen.page";
import { loginScreen } from "../screen/loginScreen.page";

describe('Home Screen Tests', () => {
  // it('TC037: Home screen is displayed', async () => {
  //   await homeScreen.launchApp();
  //   await homeScreen.verifyHomeScreenDisplayed();
  // });

  it('TC038: Navigate to Login', async () => {
    // Preconditions: User is on home screen
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapLoginButton();
    await loginScreen.verifyLoginScreenDisplayed();
  });

  it('TC039: Navigate to Phone Shopping', async () => {
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

  it('TC040: Navigate to Bring Your Own Phone', async () => {
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

  it('TC041: Navigate to Broadband Shopping', async () => {
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