import { portingEligibilityScreen, portingEligibilityLocators } from "../screen/PortingEligibilityScreen.page";

describe('Porting Check Eligibility Screen Tests', () => {
  it('TC001: Valid phone number entry for porting eligibility check', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Tap on the phone number input field
    await portingEligibilityScreen.tapPhoneNumberField();
    
    // Step 2: Clear existing content if any
    await portingEligibilityScreen.clearPhoneNumber();
    
    // Step 3: Enter a valid 10-digit phone number (e.g., 9876543210)
    await portingEligibilityScreen.enterPhoneNumber('9876543210');
    
    // Step 4: Verify the number is displayed correctly in the field
    await portingEligibilityScreen.verifyPhoneNumberDisplayed('9876543210');
    
    // Expected result: Phone number is entered successfully and displayed in the correct format
    const phoneValue = await portingEligibilityScreen.getPhoneNumberValue();
    expect(phoneValue).toBe('9876543210');
  });

  it('TC002: Invalid phone number entry validation', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Tap on the phone number input field
    await portingEligibilityScreen.tapPhoneNumberField();
    
    // Step 2: Enter an invalid phone number (e.g., 123)
    await portingEligibilityScreen.enterPhoneNumber('123');
    
    // Step 3: Attempt to proceed with eligibility check
    await portingEligibilityScreen.tapCheckEligibilityButton();
    
    // Step 4: Observe validation behavior
    // Expected result: System should display appropriate error message for invalid phone number format
    await driver.pause(2000); // Wait for validation
  });

  it('TC003: Carrier selection from dropdown', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Tap on the carrier dropdown container
    await portingEligibilityScreen.selectCarrier('T-Mobile');
    
    // Step 2: Select T-Mobile from the available options
    // Step 3: Verify the selection is displayed in the dropdown field
    await portingEligibilityScreen.verifyCarrierSelected('T-Mobile');
    
    // Expected result: T-Mobile is selected and displayed in the carrier field
  });

  it('TC004: Account number entry for porting eligibility', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Tap on the account number input field
    await portingEligibilityScreen.tapAccountNumberField();
    
    // Step 2: Enter a valid account number (e.g., 1234567890)
    await portingEligibilityScreen.enterAccountNumber('1234567890');
    
    // Step 3: Verify the number is displayed in the field
    await portingEligibilityScreen.verifyAccountNumberDisplayed('1234567890');
    
    // Expected result: Account number is entered successfully and displayed correctly
  });

  it('TC005: Complete porting eligibility check with valid data', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Enter valid phone number (988898822)
    await portingEligibilityScreen.enterPhoneNumber('988898822');
    
    // Step 2: Select T-Mobile from carrier dropdown
    await portingEligibilityScreen.selectCarrier('T-Mobile');
    
    // Step 3: Enter valid account number (2000200022)
    await portingEligibilityScreen.enterAccountNumber('2000200022');
    
    // Step 4: Tap 'Check Porting Eligibility' button
    await portingEligibilityScreen.tapCheckEligibilityButton();
    
    // Step 5: Wait for response
    await driver.pause(3000);
    
    // Expected result: System processes the request and displays eligibility status
  });

  it('TC006: Empty phone number field validation', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Leave phone number field empty
    await portingEligibilityScreen.clearPhoneNumber();
    
    // Step 2: Select carrier and enter account number
    await portingEligibilityScreen.selectCarrier('T-Mobile');
    await portingEligibilityScreen.enterAccountNumber('1234567890');
    
    // Step 3: Tap 'Check Porting Eligibility' button
    await portingEligibilityScreen.tapCheckEligibilityButton();
    
    // Step 4: Observe validation message
    await driver.pause(2000);
    
    // Expected result: System displays error message indicating phone number is required
  });

  it('TC007: Empty account number field validation', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Enter valid phone number
    await portingEligibilityScreen.enterPhoneNumber('9876543210');
    
    // Step 2: Select carrier
    await portingEligibilityScreen.selectCarrier('T-Mobile');
    
    // Step 3: Leave account number field empty
    await portingEligibilityScreen.clearAccountNumber();
    
    // Step 4: Tap 'Check Porting Eligibility' button
    await portingEligibilityScreen.tapCheckEligibilityButton();
    
    // Step 5: Observe validation message
    await driver.pause(2000);
    
    // Expected result: System displays error message indicating account number is required
  });

  it('TC008: Long press functionality on input fields', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Enter some text in phone number field
    await portingEligibilityScreen.enterPhoneNumber('9876543210');
    
    // Step 2: Long press on the phone number input field
    await portingEligibilityScreen.longPressPhoneNumberField();
    
    // Step 3: Observe context menu options (copy, paste, select all, etc.)
    await driver.pause(2000);
    
    // Step 4: Repeat for account number field
    await portingEligibilityScreen.enterAccountNumber('1234567890');
    await portingEligibilityScreen.longPressAccountNumberField();
    
    // Expected result: Context menu appears with appropriate options for text manipulation
    await driver.pause(2000);
  });

  it('TC016: Maximum character limit for phone number field', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Tap on phone number input field
    await portingEligibilityScreen.tapPhoneNumberField();
    
    // Step 2: Enter more than 10 digits (e.g., 12345678901234)
    await portingEligibilityScreen.enterPhoneNumber('12345678901234');
    
    // Step 3: Verify field behavior with excess characters
    const phoneValue = await portingEligibilityScreen.getPhoneNumberValue();
    
    // Expected result: Field should limit input to appropriate length or handle excess gracefully
    console.log('Phone number entered:', phoneValue);
  });

  it('TC017: Special characters in account number field', async () => {
    // Preconditions: User is on the Porting Check Eligibility screen
    await portingEligibilityScreen.launchApp();
    await portingEligibilityScreen.verifyPortingEligibilityScreenDisplayed();
    
    // Step 1: Tap on account number input field
    await portingEligibilityScreen.tapAccountNumberField();
    
    // Step 2: Enter special characters (!@#$%)
    await portingEligibilityScreen.enterAccountNumber('!@#$%');
    
    // Step 3: Attempt to submit form
    await portingEligibilityScreen.tapCheckEligibilityButton();
    
    // Step 4: Observe validation behavior
    await driver.pause(2000);
    
    // Expected result: System should validate and handle special characters appropriately
  });
});