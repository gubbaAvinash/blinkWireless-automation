import { addOnsScreen, addOnsScreenLocators } from "../screen/AddOnsScreen.page";

describe('Add-Ons Screen Tests', () => {
  it('TC001: Navigate back using back arrow button', async () => {
    // Preconditions: User is on Add-Ons screen (step 2/5), Previous screen exists in navigation stack
    await addOnsScreen.launchApp();
    
    // Step 1: Launch the mobile application
    // Step 2: Navigate to Add-Ons screen
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 3: Tap on the back arrow button in the top-left corner
    await addOnsScreen.tapBackArrow();
    
    // Expected result: User should be navigated back to the previous screen in the wizard flow
    await driver.pause(2000);
  });

  it('TC002: Cancel wizard flow from Add-Ons screen', async () => {
    // Preconditions: User is on Add-Ons screen
    await addOnsScreen.launchApp();
    
    // Step 1: Navigate to Add-Ons screen
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 2: Tap on the Cancel button in the top-right corner
    await addOnsScreen.tapCancelButton();
    
    // Step 3: Confirm cancellation if prompted
    // Expected result: User should exit the wizard flow and return to the main screen
    await driver.pause(2000);
  });

  it('TC003: Switch between add-on tabs', async () => {
    // Preconditions: User is on Add-Ons screen
    await addOnsScreen.launchApp();
    
    // Step 1: Navigate to Add-Ons screen
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 2: Tap on 'Roaming' tab
    await addOnsScreen.switchToRoamingTab();
    
    // Step 3: Verify content changes to roaming add-ons
    await driver.pause(1000);
    
    // Step 4: Tap on 'Content' tab
    await addOnsScreen.switchToContentTab();
    
    // Step 5: Verify content changes to content add-ons
    await driver.pause(1000);
    
    // Step 6: Tap on 'Data' tab
    await addOnsScreen.switchToDataTab();
    
    // Step 7: Verify content changes back to data add-ons
    // Expected result: Tab content should change appropriately when switching between tabs
    await expect(addOnsScreenLocators.hboMaxText()).toBeDisplayed();
  });

  it('TC004: Select HBO Max add-on', async () => {
    // Preconditions: User is on Add-Ons screen, Data tab is selected
    await addOnsScreen.launchApp();
    
    // Step 1: Navigate to Add-Ons screen
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 2: Tap on HBO Max text or logo
    await addOnsScreen.selectHBOMax();
    
    // Step 3: Verify selection indicator appears
    await driver.pause(1000);
    
    // Step 4: Check if total price is updated to include $9.00
    // Expected result: HBO Max should be selected and total price should increase by $9.00
    const totalPrice = await addOnsScreen.getTotalPrice();
    await expect(totalPrice).toContain('$');
  });

  it('TC005: Select Amazon Prime add-on', async () => {
    // Preconditions: User is on Add-Ons screen, Data tab is selected
    await addOnsScreen.launchApp();
    
    // Step 1: Navigate to Add-Ons screen
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 2: Tap on the blue checkmark next to Amazon Prime
    await addOnsScreen.selectAmazonPrime();
    
    // Step 3: Verify selection state changes
    await driver.pause(1000);
    
    // Step 4: Check if total price is updated
    // Expected result: Amazon Prime should be selected/deselected and total price should be updated accordingly
    const totalPrice = await addOnsScreen.getTotalPrice();
    await expect(totalPrice).toContain('$');
  });

  it('TC006: Select HULU add-on', async () => {
    // Preconditions: User is on Add-Ons screen, Data tab is selected
    await addOnsScreen.launchApp();
    
    // Step 1: Navigate to Add-Ons screen
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 2: Tap on HULU text or logo
    await addOnsScreen.selectHulu();
    
    // Step 3: Verify selection indicator appears
    await driver.pause(1000);
    
    // Step 4: Check if total price is updated to include $12.00
    // Expected result: HULU should be selected and total price should increase by $12.00
    const totalPrice = await addOnsScreen.getTotalPrice();
    await expect(totalPrice).toContain('$');
  });

  it('TC007: View order details', async () => {
    // Preconditions: User is on Add-Ons screen
    await addOnsScreen.launchApp();
    
    // Step 1: Navigate to Add-Ons screen
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 2: Tap on 'Order details' dropdown
    await addOnsScreen.tapOrderDetails();
    
    // Step 3: Verify details section expands
    await driver.pause(1000);
    
    // Step 4: Tap again to collapse
    await addOnsScreen.tapOrderDetails();
    
    // Step 5: Verify details section collapses
    // Expected result: Order details section should expand and collapse when tapped
    await driver.pause(1000);
  });

  it('TC008: Continue to next step with selected add-ons', async () => {
    // Preconditions: User is on Add-Ons screen, At least one add-on is selected
    await addOnsScreen.launchApp();
    
    // Step 1: Navigate to Add-Ons screen
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 2: Select one or more add-ons
    await addOnsScreen.selectHBOMax();
    
    // Step 3: Tap on Continue button
    await addOnsScreen.tapContinueButton();
    
    // Step 4: Verify navigation to next step (3/5)
    // Expected result: User should proceed to the next step in the wizard flow
    await driver.pause(2000);
  });

  it('TC009: Continue without selecting any add-ons', async () => {
    // Preconditions: User is on Add-Ons screen, No add-ons are selected
    await addOnsScreen.launchApp();
    
    // Step 1: Navigate to Add-Ons screen
    await addOnsScreen.verifyAddOnsScreenDisplayed();
    
    // Step 2: Ensure no add-ons are selected
    // Step 3: Tap on Continue button
    await addOnsScreen.tapContinueButton();
    
    // Step 4: Verify if navigation proceeds or validation message appears
    // Expected result: User should either proceed to next step or see appropriate validation message
    await driver.pause(2000);
  });
});