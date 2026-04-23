import { mainScreen, mainScreenLocators } from "../screen/MainScreen.page";

describe('Main Screen Tests', () => {
  it('TC003: Navigate to login screen', async () => {
    // Preconditions: BlinkWireless app is launched, Main screen is displayed
    await mainScreen.launchApp();
    
    // Step 1: Verify main screen is displayed
    await mainScreen.verifyMainScreenDisplayed();
    
    // Step 2: Locate Login button in top right corner
    // Step 3: Tap on 'Login' button
    await mainScreen.tapLoginButton();
    
    // Expected result: User is navigated to login screen with username and password fields
    // Note: Login screen verification would be implemented in LoginScreen.ts
  });

  it('TC004: Navigate to phone shopping catalog', async () => {
    // Preconditions: BlinkWireless app is launched, Main screen is displayed
    await mainScreen.launchApp();
    await mainScreen.verifyMainScreenDisplayed();
    
    // Step 1: Scroll down to locate Shop Phone button
    // Step 2: Verify button text displays 'Shop Phone'
    await mainScreen.verifyShopPhoneButtonText();
    
    // Step 3: Tap on 'Shop Phone' button
    await mainScreen.tapShopPhoneButton();
    
    // Expected result: User is navigated to phone shopping catalog with available phones displayed
    // Note: Phone catalog screen verification would be implemented in PhoneCatalogScreen.ts
  });

  it('TC005: Navigate to BYOP service page', async () => {
    // Preconditions: BlinkWireless app is launched, Main screen is displayed
    await mainScreen.launchApp();
    await mainScreen.verifyMainScreenDisplayed();
    
    // Step 1: Scroll down to locate 'Bring your own phone' section
    // Step 2: Verify section text and phone icon are visible
    await mainScreen.verifyBringYourOwnPhoneSectionVisible();
    
    // Step 3: Tap on 'Bring your own phone' section
    await mainScreen.tapBringYourOwnPhoneSection();
    
    // Expected result: User is navigated to BYOP service page with relevant information and options
    // Note: BYOP screen verification would be implemented in BYOPScreen.ts
  });

  it('TC006: Navigate to broadband services catalog', async () => {
    // Preconditions: BlinkWireless app is launched, Main screen is displayed
    await mainScreen.launchApp();
    await mainScreen.verifyMainScreenDisplayed();
    
    // Step 1: Scroll down to locate 'Shop Broadbands' section
    // Step 2: Verify section text and router icon are visible
    await mainScreen.verifyShopBroadbandsSectionVisible();
    
    // Step 3: Tap on 'Shop Broadbands' section
    await mainScreen.tapShopBroadbandsSection();
    
    // Expected result: User is navigated to broadband services catalog with available plans displayed
    // Note: Broadband catalog screen verification would be implemented in BroadbandCatalogScreen.ts
  });
});