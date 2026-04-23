import { productDetailScreen, productDetailLocators } from "../screen/ProductDetailScreen.page";

describe('Product Detail Screen Tests', () => {
  it('TC001: Navigate back from product detail screen', async () => {
    // Preconditions: User is on Xperia product detail screen
    await productDetailScreen.launchApp();
    
    // Step 1: Locate the back arrow button in the top left corner
    // Step 2: Tap on the back arrow button
    await productDetailScreen.tapBackArrow();
    
    // Step 3: Observe the screen transition
    // Expected result: User should be navigated back to the previous screen successfully
    await driver.pause(2000); // Allow time for navigation
  });

  it('TC002: Select black color variant', async () => {
    // Preconditions: User is on product detail screen with color options visible
    await productDetailScreen.launchApp();
    
    // Step 1: Locate the black color option in the Colors section
    // Step 2: Tap on the black color option
    await productDetailScreen.selectBlackColor();
    
    // Step 3: Verify the selection is highlighted or confirmed
    // Expected result: Black color variant should be selected and visually indicated as selected
    await productDetailScreen.verifyColorSelection('black');
  });

  it('TC003: Select purple color variant', async () => {
    // Preconditions: User is on product detail screen with color options visible
    await productDetailScreen.launchApp();
    
    // Step 1: Locate the purple color option in the Colors section
    // Step 2: Tap on the purple color option
    await productDetailScreen.selectPurpleColor();
    
    // Step 3: Verify the selection is highlighted or confirmed
    // Expected result: Purple color variant should be selected and visually indicated as selected
    await productDetailScreen.verifyColorSelection('purple');
  });

  it('TC004: Switch between color variants', async () => {
    // Preconditions: User is on product detail screen with multiple color options visible
    await productDetailScreen.launchApp();
    
    // Step 1: Select black color option
    await productDetailScreen.selectBlackColor();
    
    // Step 2: Verify black is selected
    await productDetailScreen.verifyColorSelection('black');
    
    // Step 3: Select purple color option
    await productDetailScreen.selectPurpleColor();
    
    // Step 4: Verify purple is selected and black is deselected
    // Expected result: Only one color should be selected at a time, with proper visual feedback
    await productDetailScreen.verifyColorSelection('purple');
  });

  it('TC005: Initiate purchase process', async () => {
    // Preconditions: User is on product detail screen with Buy button visible
    await productDetailScreen.launchApp();
    
    // Step 1: Locate the Buy button at the bottom of the screen
    // Step 2: Tap on the Buy button
    await productDetailScreen.tapBuyButton();
    
    // Step 3: Observe the screen transition or action
    // Expected result: Purchase process should be initiated, navigating to price plan or checkout screen
    await driver.pause(3000); // Allow time for navigation
  });

  it('TC006: Switch to Features tab', async () => {
    // Preconditions: User is on product detail screen with Overview tab active
    await productDetailScreen.launchApp();
    
    // Step 1: Locate the Features tab in the tab navigation
    // Step 2: Tap on the Features tab
    await productDetailScreen.switchToFeaturesTab();
    
    // Step 3: Verify the tab content changes to show features
    // Expected result: Features tab should become active and display feature content
    await productDetailScreen.verifyTabActive('features');
  });

  it('TC007: Switch back to Overview tab', async () => {
    // Preconditions: User is on product detail screen with Features tab active
    await productDetailScreen.launchApp();
    await productDetailScreen.switchToFeaturesTab();
    
    // Step 1: Locate the Overview tab in the tab navigation
    // Step 2: Tap on the Overview tab
    await productDetailScreen.switchToOverviewTab();
    
    // Step 3: Verify the tab content changes to show overview information
    // Expected result: Overview tab should become active and display overview content
    await productDetailScreen.verifyTabActive('overview');
  });

  it('TC008: View product image gallery', async () => {
    // Preconditions: User is on product detail screen with product images visible
    await productDetailScreen.launchApp();
    
    // Step 1: Locate the product image area
    // Step 2: Perform swipe gesture on the image
    await productDetailScreen.swipeProductImage();
    
    // Step 3: Verify image changes and page indicators update
    // Expected result: Product images should change and page indicators should reflect current position
    await productDetailScreen.verifyPageIndicatorsUpdate();
  });

  it('TC020: Verify rapid color selection changes', async () => {
    // Preconditions: User is on product detail screen with color options
    await productDetailScreen.launchApp();
    
    // Step 1: Rapidly tap between black and purple color options multiple times
    await productDetailScreen.selectBlackColor();
    await driver.pause(100);
    await productDetailScreen.selectPurpleColor();
    await driver.pause(100);
    await productDetailScreen.selectBlackColor();
    await driver.pause(100);
    await productDetailScreen.selectPurpleColor();
    
    // Step 2: Verify each selection is properly registered
    // Step 3: Confirm final selection is accurate
    // Expected result: System should handle rapid selections gracefully with accurate final state
    await productDetailScreen.verifyColorSelection('purple');
  });
});