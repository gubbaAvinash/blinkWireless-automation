import { personalDetailsScreen, personalDetailsScreenLocators } from "../screen/PersonalDetailsScreen.page";

describe('Personal Details Screen Tests', () => {
  it('TC015: Enter valid personal details', async () => {
    // Preconditions: User is on Personal Details screen (4/6)
    await personalDetailsScreen.navigateToPersonalDetailsScreen();
    
    // Step 1: Navigate to Personal Details screen
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    
    // Step 2: Tap on Name field and enter 'John Doe'
    await personalDetailsScreen.enterName('John Doe');
    
    // Step 3: Tap on Email field and enter 'john.doe@email.com'
    await personalDetailsScreen.enterEmail('john.doe@email.com');
    
    // Step 4: Tap on Phone field and enter '1234567890'
    await personalDetailsScreen.enterPhone('1234567890');
    
    // Step 5: Tap Continue button
    await personalDetailsScreen.tapContinueButton();
    
    // Expected result: All fields should accept input and user should proceed to next step
    await driver.pause(2000);
  });

  it('TC016: Enter invalid email format', async () => {
    // Preconditions: User is on Personal Details screen
    await personalDetailsScreen.navigateToPersonalDetailsScreen();
    
    // Step 1: Navigate to Personal Details screen
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    
    // Step 2: Enter valid name
    await personalDetailsScreen.enterName('John Doe');
    
    // Step 3: Enter invalid email 'invalid-email'
    await personalDetailsScreen.enterEmail('invalid-email');
    
    // Step 4: Enter valid phone number
    await personalDetailsScreen.enterPhone('1234567890');
    
    // Step 5: Tap Continue button
    await personalDetailsScreen.tapContinueButton();
    
    // Expected result: System should show email validation error message
    await driver.pause(2000);
  });

  it('TC017: Enter invalid phone number', async () => {
    // Preconditions: User is on Personal Details screen
    await personalDetailsScreen.navigateToPersonalDetailsScreen();
    
    // Step 1: Navigate to Personal Details screen
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    
    // Step 2: Enter valid name
    await personalDetailsScreen.enterName('John Doe');
    
    // Step 3: Enter valid email
    await personalDetailsScreen.enterEmail('john.doe@email.com');
    
    // Step 4: Enter invalid phone number '123'
    await personalDetailsScreen.enterPhone('123');
    
    // Step 5: Tap Continue button
    await personalDetailsScreen.tapContinueButton();
    
    // Expected result: System should show phone number validation error message
    await driver.pause(2000);
  });

  it('TC018: Leave required fields empty', async () => {
    // Preconditions: User is on Personal Details screen
    await personalDetailsScreen.navigateToPersonalDetailsScreen();
    
    // Step 1: Navigate to Personal Details screen
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    
    // Step 2: Leave all fields empty
    await personalDetailsScreen.clearAllFields();
    
    // Step 3: Tap Continue button
    await personalDetailsScreen.tapContinueButton();
    
    // Step 4: Verify validation messages appear
    // Expected result: System should show validation errors for empty required fields
    await driver.pause(2000);
  });

  it('TC019: Edit pre-filled personal details', async () => {
    // Preconditions: User is on Personal Details screen with pre-filled data
    await personalDetailsScreen.navigateToPersonalDetailsScreen();
    
    // Step 1: Navigate to Personal Details screen with pre-filled data
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    
    // Step 2: Clear Name field and enter new name
    await personalDetailsScreen.enterName('New Name');
    
    // Step 3: Clear Email field and enter new email
    await personalDetailsScreen.enterEmail('new.email@test.com');
    
    // Step 4: Clear Phone field and enter new phone
    await personalDetailsScreen.enterPhone('9876543210');
    
    // Step 5: Tap Continue button
    await personalDetailsScreen.tapContinueButton();
    
    // Expected result: User should be able to edit all fields and proceed with new data
    await driver.pause(2000);
  });

  it('TC020: Long press on input fields', async () => {
    // Preconditions: User is on Personal Details screen with text in fields
    await personalDetailsScreen.navigateToPersonalDetailsScreen();
    
    // Step 1: Navigate to Personal Details screen
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    
    // Step 2: Enter text in Name field
    await personalDetailsScreen.enterName('Test Name');
    
    // Step 3: Long press on Name field
    await personalDetailsScreen.longPressNameField();
    
    // Step 4: Verify context menu appears with options like Cut, Copy, Paste
    // Expected result: Context menu should appear with text editing options
    await driver.pause(2000);
  });

  it('TC023: Test maximum character limits in input fields', async () => {
    // Preconditions: User is on Personal Details screen
    await personalDetailsScreen.navigateToPersonalDetailsScreen();
    
    // Step 1: Navigate to Personal Details screen
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    
    // Step 2: Enter very long text (500+ characters) in Name field
    const longText = 'A'.repeat(500);
    await personalDetailsScreen.enterName(longText);
    
    // Step 3: Enter very long text in Email field
    await personalDetailsScreen.enterEmail(longText + '@email.com');
    
    // Step 4: Enter very long text in Phone field
    await personalDetailsScreen.enterPhone(longText);
    
    // Step 5: Verify field behavior and validation
    // Expected result: Fields should either limit input or show appropriate validation messages
    await driver.pause(2000);
  });

  it('TC024: Test special characters in input fields', async () => {
    // Preconditions: User is on Personal Details screen
    await personalDetailsScreen.navigateToPersonalDetailsScreen();
    
    // Step 1: Navigate to Personal Details screen
    await personalDetailsScreen.verifyPersonalDetailsScreenDisplayed();
    
    // Step 2: Enter name with special characters 'John@#$%'
    await personalDetailsScreen.enterName('John@#$%');
    
    // Step 3: Enter email with special characters
    await personalDetailsScreen.enterEmail('test@#$%@email.com');
    
    // Step 4: Enter phone with special characters
    await personalDetailsScreen.enterPhone('123@#$%456');
    
    // Step 5: Tap Continue and verify validation
    await personalDetailsScreen.tapContinueButton();
    
    // Expected result: System should validate and handle special characters appropriately
    await driver.pause(2000);
  });
});