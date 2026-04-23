import { portingEligibilityScreen } from "../screen/PortingEligibilityScreen.page";

describe('Porting Eligibility Screen Tests', () => {
  it('TC014: Enter phone number in porting eligibility form', async () => {
    // Preconditions: User is on porting eligibility check screen
    await portingEligibilityScreen.navigateToPortingEligibility();
    
    // Step 1: Navigate to porting eligibility check screen
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 2: Tap on phone number input field
    // Step 3: Clear existing text and enter '5551234567'
    await portingEligibilityScreen.clearAndEnterPhoneNumber('5551234567');

    // Step 4 / expected result: number shown in the field, field usable, still on Porting Check Eligibility
    await portingEligibilityScreen.verifyPhoneNumberFieldExpectedOutcome('5551234567');
  });

  it('TC015: Select carrier from dropdown', async () => {
    // Preconditions: User is on porting eligibility check screen
    await portingEligibilityScreen.navigateToPortingEligibility();
    
    // Step 1: Navigate to porting eligibility check screen
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 2: Tap on carrier dropdown field
    // Step 3: Select a carrier from the dropdown list
    await portingEligibilityScreen.selectCarrier('T-Mobile');

    // Step 4 / expected result: carrier shown in the field and dropdown still on Porting Check Eligibility
    await portingEligibilityScreen.verifyCarrierSelectionExpectedOutcome('T-Mobile');
  });

  it('TC016: Enter account number for porting', async () => {
    // Preconditions: User is on porting eligibility check screen
    await portingEligibilityScreen.navigateToPortingEligibility();
    
    // Step 1: Navigate to porting eligibility check screen
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 2: Tap on account number input field
    // Step 3: Enter account number '1234567890'
    await portingEligibilityScreen.clearAndEnterAccountNumber('1234567890');

    // Step 4 / expected result: account number visible, enabled, and screen context unchanged
    await portingEligibilityScreen.verifyAccountNumberFieldExpectedOutcome('1234567890');
  });

  it('TC017: Submit complete porting eligibility check', async () => {
    // Preconditions: User is on porting eligibility check screen
    await portingEligibilityScreen.navigateToPortingEligibility();
    
    // Step 1: Enter valid phone number '5551234567'
    await portingEligibilityScreen.clearAndEnterPhoneNumber('5551234567');
    
    // Step 2: Select carrier 'T-Mobile' from dropdown
    await portingEligibilityScreen.selectCarrier('T-Mobile');
    
    // Step 3: Enter account number '1234567890'
    await portingEligibilityScreen.clearAndEnterAccountNumber('1234567890');
    
    // Step 4: Tap 'Check Porting Eligibility' button
    await portingEligibilityScreen.tapCheckPortingEligibilityButton();

    // Step 5 / expected result: submit settles; form still coherent; instruction copy visible (response context)
    await portingEligibilityScreen.verifyPortingEligibilitySubmitExpectedOutcome();
  });

  it('TC018: Submit porting form with missing required fields', async () => {
    // Preconditions: User is on porting eligibility check screen
    await portingEligibilityScreen.navigateToPortingEligibility();
    
    // Step 1: Leave phone number field empty
    await portingEligibilityScreen.clearAndEnterPhoneNumber('');
    
    // Step 2: Select carrier from dropdown
    await portingEligibilityScreen.selectCarrier('T-Mobile');
    
    // Step 3: Enter account number
    await portingEligibilityScreen.clearAndEnterAccountNumber('1234567890');
    
    // Step 4: Tap 'Check Porting Eligibility' button
    await portingEligibilityScreen.tapCheckPortingEligibilityButton();

    // Expected result: System displays validation error for missing required phone number field
    await portingEligibilityScreen.verifyPhoneNumberRequiredValidationDisplayed();
  });
});