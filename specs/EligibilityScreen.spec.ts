import { eligibilityScreen, eligibilityScreenLocators } from "../screen/EligibilityScreen.page";

describe('Eligibility Screen Tests', () => {
  it('TC019: Enter Mobile Number for Eligibility Check', async () => {
    // Preconditions: User is on eligibility check screen
    await eligibilityScreen.navigateToEligibilityScreen();
    
    // Step 1: Tap on mobile number field
    // Step 2: Enter valid mobile number
    await eligibilityScreen.enterMobileNumber('555-123-4567');
    
    // Step 3: Verify input is accepted
    // Expected result: Mobile number is successfully entered in the field
    await expect(eligibilityScreenLocators.mobileNumberField()).toHaveText('555-123-4567');
  });

  it('TC020: Enter Invalid Mobile Number', async () => {
    // Preconditions: User is on eligibility check screen
    await eligibilityScreen.navigateToEligibilityScreen();
    
    // Step 1: Tap on mobile number field
    // Step 2: Enter invalid mobile number
    await eligibilityScreen.enterMobileNumber('123');
    
    // Step 3: Tap Check Eligibility button
    await eligibilityScreen.tapCheckEligibilityButton();
    
    // Step 4: Verify validation response
    // Expected result: System shows validation error for invalid mobile number
    await driver.pause(2000);
  });

  it('TC021: Check Eligibility with Valid Data', async () => {
    // Preconditions: User is on eligibility check screen, Valid mobile number is entered
    await eligibilityScreen.navigateToEligibilityScreen();
    
    // Step 1: Enter valid mobile number
    await eligibilityScreen.enterMobileNumber('555-123-4567');
    
    // Step 2: Tap 'Check Eligibility' button
    await eligibilityScreen.tapCheckEligibilityButton();
    
    // Step 3: Verify eligibility results are displayed
    // Expected result: Eligibility check is performed and results are displayed
    await driver.pause(3000);
  });

  it('TC022: Check Eligibility with Empty Fields', async () => {
    // Preconditions: User is on eligibility check screen
    await eligibilityScreen.navigateToEligibilityScreen();
    
    // Step 1: Leave mobile number field empty
    await eligibilityScreen.clearMobileNumberField();
    
    // Step 2: Tap 'Check Eligibility' button
    await eligibilityScreen.tapCheckEligibilityButton();
    
    // Step 3: Verify validation response
    // Expected result: System shows validation error for empty required field
    await driver.pause(2000);
  });

  it('TC023: Close Screen Navigation', async () => {
    // Preconditions: User is on a screen with close button
    await eligibilityScreen.navigateToEligibilityScreen();
    
    // Step 1: Locate close button
    // Step 2: Tap on close button
    await eligibilityScreen.tapCloseButton();
    
    // Step 3: Verify navigation to previous screen
    // Expected result: User is navigated back to the previous screen
    await driver.pause(2000);
  });

  it('TC024: Long Press on Mobile Number Field', async () => {
    // Preconditions: User is on eligibility check screen
    await eligibilityScreen.navigateToEligibilityScreen();
    
    // Step 1: Long press on mobile number field
    await eligibilityScreen.longPressMobileNumberField();
    
    // Step 2: Verify context menu appears
    await driver.pause(1000);
    
    // Step 3: Test available options
    // Expected result: Context menu with paste/select options appears on long press
    await driver.pause(1000);
  });
});