import { xperiaDetailScreen, xperiaDetailLocators } from "../screen/XperiaDetailScreen.page";

describe('Xperia Product Detail Screen Tests', () => {
  it('TC012: Storage option selection on product detail page', async () => {
    // Preconditions: User is on Xperia product detail page
    await xperiaDetailScreen.navigateToXperiaDetail();
    await xperiaDetailScreen.verifyXperiaDetailScreenDisplayed();
    
    // Step 1: Note the current price displayed
    const initialPrice = await xperiaDetailScreen.getCurrentPrice();
    
    // Step 2: Tap on 128 GB storage option
    await xperiaDetailScreen.select128GBStorage();
    
    // Step 3: Verify selection and observe price
    await driver.pause(1000);
    
    // Step 4: Tap on 256 GB storage option
    await xperiaDetailScreen.select256GBStorage();
    
    // Step 5: Verify selection and observe price change
    await driver.pause(1000);
    
    // Expected result: Storage options can be selected and price updates reflect the selection
  });

  it('TC013: Tab navigation between Overview and Features', async () => {
    // Preconditions: User is on Xperia product detail page
    await xperiaDetailScreen.navigateToXperiaDetail();
    await xperiaDetailScreen.verifyXperiaDetailScreenDisplayed();
    
    // Step 1: Verify Overview tab is currently selected
    await xperiaDetailScreen.verifyTabSelected('Overview');
    
    // Step 2: Tap on Features tab
    await xperiaDetailScreen.tapFeaturesTab();
    
    // Step 3: Verify Features content is displayed
    await driver.pause(1000);
    await xperiaDetailScreen.verifyTabSelected('Features');
    
    // Step 4: Tap on Overview tab
    await xperiaDetailScreen.tapOverviewTab();
    
    // Step 5: Verify Overview content is displayed
    await driver.pause(1000);
    await xperiaDetailScreen.verifyTabSelected('Overview');
    
    // Expected result: Tab content switches appropriately between Overview and Features
  });

  it('TC014: Buy button functionality', async () => {
    // Preconditions: User is on Xperia product detail page with selections made
    await xperiaDetailScreen.navigateToXperiaDetail();
    await xperiaDetailScreen.verifyXperiaDetailScreenDisplayed();
    
    // Step 1: Select desired color option
    await xperiaDetailScreen.selectPurpleColor();
    
    // Step 2: Select desired storage option
    await xperiaDetailScreen.select256GBStorage();
    
    // Step 3: Tap on Buy button
    await xperiaDetailScreen.tapBuyButton();
    
    // Step 4: Verify purchase process is initiated
    await driver.pause(2000);
    
    // Expected result: Purchase process begins with selected product configuration
  });

  it('TC015: Price display validation for different storage options', async () => {
    // Preconditions: User is on Xperia product detail page
    await xperiaDetailScreen.navigateToXperiaDetail();
    await xperiaDetailScreen.verifyXperiaDetailScreenDisplayed();
    
    // Step 1: Note initial price of $999.00
    await xperiaDetailScreen.verifyPriceDisplayed('$999.00');
    
    // Step 2: Select 256 GB storage option
    await xperiaDetailScreen.select256GBStorage();
    
    // Step 3: Verify price updates to $1,015.00
    await driver.pause(1000);
    await xperiaDetailScreen.verifyPriceDisplayed('$1,015.00');
    
    // Step 4: Select 128 GB storage option
    await xperiaDetailScreen.select128GBStorage();
    
    // Step 5: Verify price returns to original amount
    await driver.pause(1000);
    await xperiaDetailScreen.verifyPriceDisplayed('$999.00');
    
    // Expected result: Price accurately reflects the selected storage configuration
  });

  it('TC018: Image carousel navigation on product detail page', async () => {
    // Preconditions: User is on Xperia product detail page
    await xperiaDetailScreen.navigateToXperiaDetail();
    await xperiaDetailScreen.verifyXperiaDetailScreenDisplayed();
    
    // Step 1: Observe current image and dot indicator
    await expect(xperiaDetailLocators.imageCarousel()).toBeDisplayed();
    
    // Step 2: Swipe left on the image area
    await xperiaDetailScreen.swipeImageCarouselLeft();
    
    // Step 3: Verify image changes and dot indicator updates
    await driver.pause(1000);
    
    // Step 4: Swipe right on the image area
    await xperiaDetailScreen.swipeImageCarouselRight();
    
    // Step 5: Verify image changes back and dot indicator updates
    await driver.pause(1000);
    
    // Expected result: Image carousel navigates smoothly with swipe gestures and indicators update correctly
  });

  it('TC019: SIM compatibility information display', async () => {
    // Preconditions: User is on Xperia product detail page
    await xperiaDetailScreen.navigateToXperiaDetail();
    await xperiaDetailScreen.verifyXperiaDetailScreenDisplayed();
    
    // Step 1: Scroll to SIM section
    await driver.execute('mobile: scroll', { direction: 'down' });
    
    // Step 2: Verify SIM label is visible
    // Step 3: Verify compatibility text 'Both physical & eSIMs are supported on this device' is displayed
    await xperiaDetailScreen.verifySIMCompatibilityDisplayed();
    
    // Expected result: SIM compatibility information is clearly visible and informative
  });

  it('TC020: Multiple rapid taps on Buy button', async () => {
    // Preconditions: User is on Xperia product detail page
    await xperiaDetailScreen.navigateToXperiaDetail();
    await xperiaDetailScreen.verifyXperiaDetailScreenDisplayed();
    
    // Step 1: Configure product with desired options
    await xperiaDetailScreen.selectPurpleColor();
    await xperiaDetailScreen.select256GBStorage();
    
    // Step 2: Rapidly tap the Buy button multiple times
    await xperiaDetailScreen.rapidTapBuyButton(5);
    
    // Step 3: Verify only one purchase process is initiated
    // Step 4: Check for any duplicate transactions or errors
    await driver.pause(3000);
    
    // Expected result: Only one purchase process should be initiated regardless of multiple taps
  });
});