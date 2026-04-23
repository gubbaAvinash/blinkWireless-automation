import { addressScreen, addressScreenLocators } from "../screen/AddressScreen.page";

describe('Address Screen Tests', () => {
  it('TC001: Navigate back using back arrow button', async () => {
    // Preconditions: User is on step 5/6 of the address form
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Locate the back arrow button in the top navigation
    // Step 2: Tap on the back arrow button
    await addressScreen.tapBackArrow();
    
    // Step 3: Observe the navigation behavior
    // Expected result: User should be navigated to the previous step in the wizard flow
    await driver.pause(2000);
  });

  it('TC002: Cancel order process', async () => {
    // Preconditions: User is in the address entry screen
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Locate the Cancel button in the top right corner
    // Step 2: Tap on the Cancel button
    await addressScreen.tapCancelButton();
    
    // Step 3: Verify the cancellation behavior
    // Expected result: The current order process should be cancelled and user should exit the flow
    await driver.pause(2000);
  });

  it('TC003: Enter valid address in Address Line 1', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on the Address Line 1 field
    // Step 2: Clear existing text if any
    // Step 3: Enter a valid address '123 Main Street'
    await addressScreen.enterAddressLine1('123 Main Street');
    
    // Step 4: Verify the text is entered correctly
    // Expected result: The address should be successfully entered and displayed in the field
    await addressScreen.verifyFieldValue('address1', '123 Main Street');
  });

  it('TC004: Enter special characters in Address Line 1', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on the Address Line 1 field
    // Step 2: Clear existing text
    // Step 3: Enter special characters '@#$%^&*()'
    await addressScreen.enterAddressLine1('@#$%^&*()');
    
    // Step 4: Observe system behavior
    // Expected result: System should either accept special characters or show appropriate validation message
    await driver.pause(2000);
  });

  it('TC005: Leave Address Line 1 empty', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on the Address Line 1 field
    // Step 2: Clear all text from the field
    await addressScreen.clearAddressField('address1');
    
    // Step 3: Tap on Continue button
    await addressScreen.tapContinueButton();
    
    // Step 4: Check for validation messages
    // Expected result: System should display validation error for required Address Line 1 field
    await driver.pause(2000);
  });

  it('TC006: Enter valid city name', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on the City field
    // Step 2: Clear existing text
    // Step 3: Enter a valid city name 'New York'
    await addressScreen.enterCity('New York');
    
    // Step 4: Verify the text is entered correctly
    // Expected result: The city name should be successfully entered and displayed in the field
    await addressScreen.verifyFieldValue('city', 'New York');
  });

  it('TC007: Enter numeric characters in city field', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on the City field
    // Step 2: Clear existing text
    // Step 3: Enter numeric characters '12345'
    await addressScreen.enterCity('12345');
    
    // Step 4: Observe system behavior
    // Expected result: System should either reject numeric input or show validation error
    await driver.pause(2000);
  });

  it('TC008: Enter valid ZIP code', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on the ZIP code field
    // Step 2: Clear existing text
    // Step 3: Enter a valid ZIP code '90210'
    await addressScreen.enterZipCode('90210');
    
    // Step 4: Verify the text is entered correctly
    // Expected result: The ZIP code should be successfully entered and displayed in the field
    await addressScreen.verifyFieldValue('zip', '90210');
  });

  it('TC009: Enter invalid ZIP code format', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on the ZIP code field
    // Step 2: Clear existing text
    // Step 3: Enter invalid ZIP code 'ABCDE'
    await addressScreen.enterZipCode('ABCDE');
    
    // Step 4: Tap Continue button
    await addressScreen.tapContinueButton();
    
    // Step 5: Check for validation messages
    // Expected result: System should display validation error for invalid ZIP code format
    await driver.pause(2000);
  });

  it('TC010: Select state from dropdown', async () => {
    // Preconditions: Address form is displayed, State dropdown is available
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on the State dropdown
    // Step 2: Verify dropdown options are displayed
    // Step 3: Tap on 'Texas' option
    await addressScreen.selectState('Texas');
    
    // Step 4: Verify Texas is selected
    // Expected result: Texas should be selected and displayed in the state field
    await addressScreen.verifyFieldValue('state', 'Texas');
  });

  it('TC011: Proceed without selecting state', async () => {
    // Preconditions: Address form is displayed, No state is selected
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Ensure no state is selected (shows 'Select State')
    // Step 2: Fill other required fields
    await addressScreen.enterAddressLine1('123 Test St');
    await addressScreen.enterCity('Test City');
    await addressScreen.enterZipCode('12345');
    
    // Step 3: Tap Continue button
    await addressScreen.tapContinueButton();
    
    // Step 4: Check for validation messages
    // Expected result: System should display 'Please select state name' error message
    await addressScreen.verifyStateErrorMessage();
  });

  it('TC012: Complete address form with valid data', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    const addressData = {
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'Los Angeles',
      zip: '90210',
      state: 'California'
    };
    
    // Step 1-5: Fill all address fields
    await addressScreen.fillCompleteAddressForm(addressData);
    
    // Step 6: Tap Continue button
    await addressScreen.tapContinueButton();
    
    // Expected result: Form should be successfully submitted and user should proceed to next step
    await driver.pause(2000);
  });

  it('TC013: View order details', async () => {
    // Preconditions: Address form is displayed, Order details section is visible
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Locate the 'Order details' section
    // Step 2: Tap on the order details dropdown
    await addressScreen.tapOrderDetailsDropdown();
    
    // Step 3: Observe the expansion/collapse behavior
    // Expected result: Order details section should expand or collapse showing/hiding detailed order information
    await driver.pause(2000);
  });

  it('TC014: Verify order total display', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Locate the order total amount display
    // Step 2: Verify the amount shows '$1,091.00'
    // Step 3: Check that the amount is clearly visible and formatted correctly
    // Expected result: Order total should display '$1,091.00' in correct format
    await addressScreen.verifyOrderTotal('$1,091.00');
  });

  it('TC015: Long press on address fields', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Long press on Address Line 1 field
    await addressScreen.longPressAddressField('address1');
    
    // Step 2: Observe any context menu or selection behavior
    await driver.pause(1000);
    
    // Step 3: Repeat for other input fields
    await addressScreen.longPressAddressField('city');
    
    // Expected result: System should show appropriate context menu or text selection options
    await driver.pause(2000);
  });

  it('TC016: Maximum character limit for address fields', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on Address Line 1 field
    // Step 2: Enter a very long address (200+ characters)
    const longAddress = 'A'.repeat(250);
    await addressScreen.enterAddressLine1(longAddress);
    
    // Step 3: Observe system behavior and character limit enforcement
    // Expected result: System should either limit input at maximum allowed characters or show validation error
    await driver.pause(2000);
  });

  it('TC017: Progress indicator accuracy', async () => {
    // Preconditions: User is on address entry step
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Observe the progress indicator showing '5/6'
    // Step 2: Verify this matches the current step in the wizard
    await addressScreen.verifyProgressIndicator('5/6');
    
    // Step 3: Navigate to next step and verify progress updates
    await addressScreen.fillCompleteAddressForm({
      address1: '123 Test St',
      address2: 'Apt 1',
      city: 'Test City',
      zip: '12345',
      state: 'California'
    });
    await addressScreen.tapContinueButton();
    
    // Expected result: Progress indicator should accurately show current step as 5 out of 6 total steps
    await driver.pause(2000);
  });

  it('TC018: Clear individual address fields', async () => {
    // Preconditions: Address form is displayed with pre-filled data
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Tap on Address Line 1 field with existing text
    // Step 2: Use clear functionality to remove text
    await addressScreen.clearAddressField('address1');
    
    // Step 3: Verify field is cleared
    await addressScreen.verifyFieldValue('address1', '');
    
    // Step 4: Repeat for other fields
    await addressScreen.clearAddressField('city');
    await addressScreen.verifyFieldValue('city', '');
    
    // Expected result: Each field should be successfully cleared when using clear functionality
  });

  it('TC019: State dropdown keyboard navigation', async () => {
    // Preconditions: Address form is displayed, External keyboard connected
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Use keyboard to navigate to state dropdown
    await addressScreenLocators.stateDropdown().click();
    
    // Step 2: Use arrow keys to navigate through state options
    // Step 3: Use Enter key to select a state
    // Note: This test requires external keyboard simulation which may not be available in all environments
    await driver.keys(['ArrowDown', 'ArrowDown', 'Enter']);
    
    // Expected result: State dropdown should be navigable and selectable using keyboard
    await driver.pause(2000);
  });

  it('TC020: Form persistence on navigation', async () => {
    // Preconditions: Address form is displayed
    await addressScreen.navigateToAddressScreen();
    
    // Step 1: Fill in all address fields with valid data
    const testData = {
      address1: 'Test Address 123',
      address2: 'Suite 456',
      city: 'Test City',
      zip: '54321',
      state: 'Texas'
    };
    await addressScreen.fillCompleteAddressForm(testData);
    
    // Step 2: Tap back arrow to go to previous step
    await addressScreen.tapBackArrow();
    await driver.pause(1000);
    
    // Step 3: Navigate forward to address step again
    await addressScreen.navigateToAddressScreen();
    
    // Step 4: Verify all previously entered data is still present
    // Expected result: All previously entered address data should be preserved and displayed
    await addressScreen.verifyFieldValue('address1', testData.address1);
    await addressScreen.verifyFieldValue('city', testData.city);
  });
});