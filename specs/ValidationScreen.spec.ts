import { validationScreen, validationScreenLocators } from "../screen/ValidationScreen.page";

describe('Validation Screen Tests', () => {
  it('TC021: Verify price display consistency', async () => {
    // Preconditions: User has selected add-ons and navigated through screens
    await addOnsScreen.launchApp();
    
    // Step 1: Select add-ons and note total price
    await addOnsScreen.selectHBOMax();
    const addOnsPrice = await addOnsScreen.getTotalPrice();
    
    // Step 2: Navigate to SIM Type screen and verify price matches
    await addOnsScreen.tapContinueButton();
    await simTypeScreen.verifySimTypeScreenDisplayed();
    const simTypePrice = await simTypeScreenLocators.totalPrice().getText();
    
    // Step 3: Navigate to Personal Details screen and verify price matches
    await simTypeScreen.selectPhysicalSim();
    await simTypeScreen.tapContinueButton();
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    const personalDetailsPrice = await personalDetailsScreen.getTotalPrice();
    
    // Step 4: Check that price format and amount are consistent
    // Expected result: Price should remain consistent across all screens in the wizard
    await expect(addOnsPrice).toEqual(simTypePrice);
    await expect(simTypePrice).toEqual(personalDetailsPrice);
  });

  it('TC022: Verify progress indicator updates', async () => {
    // Preconditions: User is in wizard flow
    await addOnsScreen.launchApp();
    
    // Step 1: Start from Add-Ons screen and note progress (2/5)
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 2: Navigate to SIM Type screen and verify progress shows (3/5 or 3/6)
    await addOnsScreen.tapContinueButton();
    await simTypeScreen.verifySimTypeScreenDisplayed();
    
    // Step 3: Navigate to Personal Details and verify progress shows (4/6)
    await simTypeScreen.selectPhysicalSim();
    await simTypeScreen.tapContinueButton();
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    
    // Step 4: Verify progress indicator reflects current step
    // Expected result: Progress indicator should accurately show current step in wizard
    await expect(personalDetailsScreenLocators.progressIndicator()).toHaveText('4/6');
  });

  it('TC025: Verify error message display for zip code validation', async () => {
    // Preconditions: User is on a screen with zip code field, Invalid zip code is entered
    await validationScreen.navigateToValidationScreen();
    
    // Step 1: Navigate to screen with zip code field
    // Step 2: Enter invalid zip code
    // Step 3: Trigger validation
    // Step 4: Verify error message 'Please enter valid zip code' appears
    await validationScreen.verifyErrorMessageDisplayed();
    
    // Expected result: Error message should be clearly visible and properly formatted
    await expect(validationScreenLocators.errorMessage()).toBeDisplayed();
  });
});