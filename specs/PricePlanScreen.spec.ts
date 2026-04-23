import { pricePlanScreen, pricePlanLocators } from "../screen/PricePlanScreen.page";

describe('Price Plan Screen Tests', () => {
  it('TC009: Cancel price plan selection', async () => {
    // Preconditions: User is on price plan selection screen
    await pricePlanScreen.navigateToPricePlan();
    
    // Step 1: Locate the Cancel button in the top right corner
    // Step 2: Tap on the Cancel button
    await pricePlanScreen.tapCancelButton();
    
    // Step 3: Verify navigation back to previous screen
    // Expected result: User should be returned to the previous screen, canceling the price plan selection
    await driver.pause(2000);
  });

  it('TC010: Select BASIC plan', async () => {
    // Preconditions: User is on price plan selection screen with BASIC plan visible
    await pricePlanScreen.navigateToPricePlan();
    
    // Step 1: Locate the BASIC plan option
    // Step 2: Tap on the BASIC plan
    await pricePlanScreen.selectBasicPlan();
    
    // Step 3: Verify the plan is selected and highlighted
    // Expected result: BASIC plan should be selected with visual confirmation
    await pricePlanScreen.verifyBasicPlanSelected();
  });

  it('TC011: Continue with selected plan', async () => {
    // Preconditions: User has selected a price plan
    await pricePlanScreen.navigateToPricePlan();
    await pricePlanScreen.selectBasicPlan();
    
    // Step 1: Ensure a plan is selected
    // Step 2: Locate the Continue button at the bottom
    // Step 3: Tap on the Continue button
    await pricePlanScreen.tapContinueButton();
    
    // Step 4: Verify progression to next step
    // Expected result: User should proceed to the next step in the purchase flow
    await driver.pause(3000);
  });

  it('TC015: Attempt to continue without plan selection', async () => {
    // Preconditions: User is on plan selection screen with no plan selected
    await pricePlanScreen.navigateToPricePlan();
    
    // Step 1: Ensure no plans are selected
    // Step 2: Tap on the Continue button
    await pricePlanScreen.tapContinueButton();
    
    // Step 3: Observe system response
    // Expected result: System should either prevent continuation or show validation message requiring plan selection
    await driver.pause(2000);
  });

  it('TC016: Verify wizard progress indicator', async () => {
    // Preconditions: User is in the purchase wizard flow
    await pricePlanScreen.navigateToPricePlan();
    
    // Step 1: Observe the progress indicator showing '1/5'
    // Step 2: Navigate through wizard steps
    // Step 3: Verify indicator updates appropriately
    // Expected result: Progress indicator should accurately reflect current step in the wizard (1/5)
    await pricePlanScreen.verifyProgressIndicator();
  });

  it('TC017: Verify plan feature information display', async () => {
    // Preconditions: User is viewing plan options
    await pricePlanScreen.navigateToPricePlan();
    
    // Step 1: Review BASIC plan features (5G Nationwide, 25GB data, etc.)
    // Step 2: Review LITE plan features (Unlimited Talk/Text/Data, etc.)
    // Step 3: Verify all feature information is readable and complete
    // Expected result: All plan features should be clearly displayed with accurate information
    await pricePlanScreen.verifyPlanFeatures();
  });

  it('TC018: Verify recommended plan indication', async () => {
    // Preconditions: User is viewing plan options with recommended badge
    await pricePlanScreen.navigateToPricePlan();
    
    // Step 1: Locate the 'RECOMMENDED' badge on plan options
    // Step 2: Verify the badge is clearly visible and prominent
    // Step 3: Confirm it helps guide user selection
    // Expected result: Recommended plans should be clearly marked with visible 'RECOMMENDED' badge
    await pricePlanScreen.verifyRecommendedPlanIndication();
  });
});