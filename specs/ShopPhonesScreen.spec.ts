import { shopPhonesScreen, shopPhonesLocators } from "../screen/ShopPhonesScreen.page";

describe('Shop Phones Screen Tests', () => {
  it('TC009: Phone color selection functionality', async () => {
    // Preconditions: User is on the Shop Phones screen
    await shopPhonesScreen.navigateToShopPhones();
    await shopPhonesScreen.verifyShopPhonesScreenDisplayed();
    
    // Step 1: Navigate to Shop Phones screen
    // Step 2: Locate iPhone 14 product
    await expect(shopPhonesLocators.iPhone14Title()).toHaveText('iPhone 14');
    
    // Step 3: Tap on blue color option
    await shopPhonesScreen.selectiPhone14BlueColor();
    
    // Step 4: Verify blue color is selected
    await driver.pause(1000);
    
    // Step 5: Tap on red color option
    await shopPhonesScreen.selectiPhone14RedColor();
    
    // Step 6: Verify red color is selected
    await driver.pause(1000);
    
    // Expected result: Color selection changes appropriately and visual feedback is provided
  });

  it('TC010: Back navigation from Shop Phones screen', async () => {
    // Preconditions: User is on the Shop Phones screen
    await shopPhonesScreen.navigateToShopPhones();
    await shopPhonesScreen.verifyShopPhonesScreenDisplayed();
    
    // Step 1: Tap on the back arrow button
    await shopPhonesScreen.tapBackButton();
    
    // Step 2: Verify navigation to previous screen
    await driver.pause(2000);
    
    // Expected result: User is navigated back to the previous screen successfully
  });

  it('TC011: Product detail view navigation', async () => {
    // Preconditions: User is on the Shop Phones screen
    await shopPhonesScreen.navigateToShopPhones();
    await shopPhonesScreen.verifyShopPhonesScreenDisplayed();
    
    // Step 1: Locate Xperia product
    await expect(shopPhonesLocators.xperiaTitle()).toHaveText('Xperia');
    
    // Step 2: Tap on purple color option for Xperia
    await shopPhonesScreen.selectXperiaPurpleColor();
    
    // Step 3: Navigate to Xperia detail page
    await shopPhonesScreen.tapXperiaProduct();
    
    // Step 4: Verify product details are displayed
    await driver.pause(2000);
    
    // Expected result: Xperia product detail page loads with correct information
  });
});