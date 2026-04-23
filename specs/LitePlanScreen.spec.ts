import { litePlanScreen, litePlanLocators } from "../screen/LitePlanScreen.page";

describe('Lite Plan Screen Tests', () => {
  it('TC012: Add LITE plan to selection', async () => {
    // Preconditions: User is on plan selection screen with LITE plan available
    await litePlanScreen.navigateToLitePlanScreen();
    
    // Step 1: Locate the LITE plan with 'Add Lite' button
    // Step 2: Tap on the 'Add Lite' button
    await litePlanScreen.addLitePlan();
    
    // Step 3: Verify the plan is added to selection
    await litePlanScreen.verifyLitePlanAdded();
    
    // Step 4: Check if total price is updated
    // Expected result: LITE plan should be added to selection and total price should update to reflect the addition
    await litePlanScreen.verifyTotalPriceCalculation('$1,071.00');
  });

  it('TC013: Remove LITE plan from selection', async () => {
    // Preconditions: User has LITE plan added to selection
    await litePlanScreen.navigateToLitePlanScreen();
    await litePlanScreen.addLitePlan();
    
    // Step 1: Locate the LITE plan with 'Remove Lite' button
    // Step 2: Tap on the 'Remove Lite' button
    await litePlanScreen.removeLitePlan();
    
    // Step 3: Verify the plan is removed from selection
    await litePlanScreen.verifyLitePlanRemoved();
    
    // Step 4: Check if total price is updated
    // Expected result: LITE plan should be removed from selection and total price should decrease accordingly
    await litePlanScreen.verifyTotalPriceCalculation('$1,015.00');
  });

  it('TC014: Verify price calculation accuracy', async () => {
    // Preconditions: User is on plan selection screen
    await litePlanScreen.navigateToLitePlanScreen();
    
    // Step 1: Note the initial total price ($1,015.00)
    await litePlanScreen.verifyTotalPriceCalculation('$1,015.00');
    
    // Step 2: Add LITE plan ($46)
    await litePlanScreen.addLitePlan();
    
    // Step 3: Verify total becomes $1,071.00
    await litePlanScreen.verifyTotalPriceCalculation('$1,071.00');
    
    // Step 4: Remove LITE plan
    await litePlanScreen.removeLitePlan();
    
    // Step 5: Verify total returns to $1,015.00
    // Expected result: Price calculations should be accurate: $1,015.00 + $46 = $1,071.00
    await litePlanScreen.verifyTotalPriceCalculation('$1,015.00');
  });
});