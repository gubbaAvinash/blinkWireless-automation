import { homeScreen, homeScreenLocators } from "../screen/HomeScreen.page";

describe('Home Screen Tests', () => {
  it('TC003: Navigate to login screen from home page', async () => {
    // Preconditions: App is on home screen
    await homeScreen.launchApp();
    
    // Step 1: Open BlinkWireless app
    // Step 2: Locate Login button in top right corner
    await homeScreen.verifyHomeScreenDisplayed();
    
    // Step 3: Tap on Login button
    await homeScreen.tapLoginButton();
    
    // Expected result: User is navigated to login screen
    // Note: Login screen verification would be in LoginScreen.ts
  });

  it('TC004: Navigate to phone catalog via Shop Phone button', async () => {
    // Preconditions: App is on home screen
    await homeScreen.launchApp();
    
    // Step 1: Open BlinkWireless app
    await homeScreen.verifyHomeScreenDisplayed();
    
    // Step 2: Scroll to find 'Shop Phone' button
    await homeScreen.scrollToFindElement(homeScreenLocators.shopPhoneButton);
    
    // Step 3: Tap on 'Shop Phone' button
    await homeScreen.tapShopPhoneButton();
    
    // Expected result: User is navigated to phone shopping catalog page
  });

  it('TC005: Access BYOP service page', async () => {
    // Preconditions: App is on home screen
    await homeScreen.launchApp();
    
    // Step 1: Open BlinkWireless app
    await homeScreen.verifyHomeScreenDisplayed();
    
    // Step 2: Scroll to find 'Bring your own phone' section
    await homeScreen.scrollToFindElement(homeScreenLocators.byopSection);
    
    // Step 3: Tap on 'Bring your own phone' text or phone icon
    await homeScreen.tapBYOPSection();
    
    // Expected result: User is navigated to BYOP service page
  });

  it('TC006: Access broadband services page', async () => {
    // Preconditions: App is on home screen
    await homeScreen.launchApp();
    
    // Step 1: Open BlinkWireless app
    await homeScreen.verifyHomeScreenDisplayed();
    
    // Step 2: Scroll to find 'Shop Broadbands' section
    await homeScreen.scrollToFindElement(homeScreenLocators.broadbandSection);
    
    // Step 3: Tap on 'Shop Broadbands' text or router icon
    await homeScreen.tapBroadbandSection();
    
    // Expected result: User is navigated to broadband services page
  });
});