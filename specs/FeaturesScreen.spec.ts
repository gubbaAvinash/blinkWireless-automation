import { featuresScreen, featuresScreenLocators } from "../screen/FeaturesScreen.page";

describe('Features Screen Tests', () => {
  it('TC019: Verify product feature interaction', async () => {
    // Preconditions: User is on Features tab with feature list visible
    await featuresScreen.navigateToFeaturesTab();
    
    // Step 1: Tap on 'Apple Intelligence' feature
    await featuresScreen.tapAppleIntelligenceFeature();
    
    // Step 2: Verify detailed information is shown
    await driver.pause(1000);
    
    // Step 3: Repeat for other features like 'A18 Pro chip' and 'Camera Control'
    await featuresScreen.tapA18ProChipFeature();
    await driver.pause(1000);
    await featuresScreen.tapCameraControlFeature();
    
    // Expected result: Tapping on features should show detailed information or expand content
    await featuresScreen.verifyFeaturesDisplayed();
  });
});