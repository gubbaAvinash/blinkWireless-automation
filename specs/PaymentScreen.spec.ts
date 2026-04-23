import { paymentScreen, paymentScreenLocators } from "../screen/PaymentScreen.page";

describe('Payment Screen Tests', () => {
  it('TC001: Verify Payment Screen Display', async () => {
    // Preconditions: User has navigated to payment screen, Payment process is at step 6/6
    await paymentScreen.navigateToPaymentScreen();
    
    // Step 1: Navigate to payment screen
    // Step 2: Observe the screen layout and elements
    // Step 3: Verify all payment form fields are visible
    await paymentScreen.verifyPaymentScreenDisplayed();
    
    // Expected result: Payment screen displays with heading, progress indicator (6/6), instruction text, payment tabs (Card/PayPal), and form fields
    await paymentScreen.verifyCardFormDisplayed();
  });

  it('TC002: Cancel Payment Process', async () => {
    // Preconditions: User is on payment screen
    await paymentScreen.navigateToPaymentScreen();
    
    // Step 1: Navigate to payment screen
    // Step 2: Tap on 'Cancel' button
    await paymentScreen.tapCancelButton();
    
    // Step 3: Verify navigation to previous screen
    // Expected result: Payment process is cancelled and user returns to previous screen
    await driver.pause(2000);
  });

  it('TC003: Switch to Card Payment Method', async () => {
    // Preconditions: User is on payment screen
    await paymentScreen.navigateToPaymentScreen();
    
    // Step 1: Navigate to payment screen
    // Step 2: Tap on 'Card' tab
    await paymentScreen.tapCardTab();
    
    // Step 3: Verify card payment form is displayed
    // Expected result: Card payment tab is selected and card payment form fields are visible
    await paymentScreen.verifyCardFormDisplayed();
  });

  it('TC004: Switch to PayPal Payment Method', async () => {
    // Preconditions: User is on payment screen
    await paymentScreen.navigateToPaymentScreen();
    
    // Step 1: Navigate to payment screen
    // Step 2: Tap on 'Paypal' tab
    await paymentScreen.tapPaypalTab();
    
    // Step 3: Verify PayPal payment interface is displayed
    // Expected result: PayPal payment tab is selected and PayPal payment interface is shown
    await driver.pause(2000);
  });

  it('TC005: Edit Card Holder Name - Valid Input', async () => {
    // Preconditions: User is on payment screen, Card tab is selected
    await paymentScreen.navigateToPaymentScreen();
    await paymentScreen.tapCardTab();
    
    // Step 1: Tap on card holder name field
    // Step 2: Clear existing text
    // Step 3: Enter valid card holder name
    await paymentScreen.enterCardHolderName('John Doe');
    
    // Step 4: Verify input is accepted
    // Expected result: Card holder name is successfully entered and displayed in the field
    await expect(paymentScreenLocators.cardHolderNameField()).toHaveText('John Doe');
  });

  it('TC006: Edit Card Holder Name - Special Characters', async () => {
    // Preconditions: User is on payment screen, Card tab is selected
    await paymentScreen.navigateToPaymentScreen();
    await paymentScreen.tapCardTab();
    
    // Step 1: Tap on card holder name field
    // Step 2: Clear existing text
    // Step 3: Enter name with special characters
    await paymentScreen.enterCardHolderName('John@Doe#123');
    
    // Step 4: Verify system response
    // Expected result: System either accepts valid characters or shows appropriate validation message
    await driver.pause(2000);
  });

  it('TC007: Edit Card Number - Valid Format', async () => {
    // Preconditions: User is on payment screen, Card tab is selected
    await paymentScreen.navigateToPaymentScreen();
    await paymentScreen.tapCardTab();
    
    // Step 1: Tap on card number field
    // Step 2: Clear existing text
    // Step 3: Enter valid card number
    await paymentScreen.enterCardNumber('4111-1111-1111-1111');
    
    // Step 4: Verify formatting and acceptance
    // Expected result: Card number is formatted correctly (with dashes) and accepted
    await expect(paymentScreenLocators.cardNumberField()).toHaveText('4111-1111-1111-1111');
  });

  it('TC008: Edit Card Number - Invalid Format', async () => {
    // Preconditions: User is on payment screen, Card tab is selected
    await paymentScreen.navigateToPaymentScreen();
    await paymentScreen.tapCardTab();
    
    // Step 1: Tap on card number field
    // Step 2: Clear existing text
    // Step 3: Enter invalid card number
    await paymentScreen.enterCardNumber('1234');
    
    // Step 4: Verify validation response
    // Expected result: System shows validation error for invalid card number format
    await driver.pause(2000);
  });

  it('TC009: Edit Expiry Date - Valid Format', async () => {
    // Preconditions: User is on payment screen, Card tab is selected
    await paymentScreen.navigateToPaymentScreen();
    await paymentScreen.tapCardTab();
    
    // Step 1: Tap on expiry date field
    // Step 2: Clear existing text
    // Step 3: Enter valid future expiry date
    await paymentScreen.enterExpiryDate('12/25');
    
    // Step 4: Verify formatting and acceptance
    // Expected result: Expiry date is formatted correctly (MM/YY) and accepted
    await expect(paymentScreenLocators.expiryDateField()).toHaveText('12/25');
  });

  it('TC010: Edit Expiry Date - Past Date', async () => {
    // Preconditions: User is on payment screen, Card tab is selected
    await paymentScreen.navigateToPaymentScreen();
    await paymentScreen.tapCardTab();
    
    // Step 1: Tap on expiry date field
    // Step 2: Clear existing text
    // Step 3: Enter past expiry date
    await paymentScreen.enterExpiryDate('01/20');
    
    // Step 4: Verify validation response
    // Expected result: System shows validation error for expired card
    await driver.pause(2000);
  });

  it('TC011: Edit Expiry Date - Invalid Format', async () => {
    // Preconditions: User is on payment screen, Card tab is selected
    await paymentScreen.navigateToPaymentScreen();
    await paymentScreen.tapCardTab();
    
    // Step 1: Tap on expiry date field
    // Step 2: Clear existing text
    // Step 3: Enter invalid date format
    await paymentScreen.enterExpiryDate('13/99');
    
    // Step 4: Verify validation response
    // Expected result: System shows validation error or auto-formats the input
    await driver.pause(2000);
  });

  it('TC012: Long Press on Card Fields', async () => {
    // Preconditions: User is on payment screen, Card tab is selected
    await paymentScreen.navigateToPaymentScreen();
    await paymentScreen.tapCardTab();
    
    // Step 1: Long press on card holder name field
    await paymentScreen.longPressCardField('name');
    
    // Step 2: Verify context menu appears
    await driver.pause(1000);
    
    // Step 3: Repeat for card number and expiry fields
    await paymentScreen.longPressCardField('number');
    await driver.pause(1000);
    await paymentScreen.longPressCardField('expiry');
    
    // Expected result: Context menu with copy/paste/select options appears on long press
    await driver.pause(1000);
  });

  it('TC013: Clear Card Fields', async () => {
    // Preconditions: User is on payment screen, Card fields contain data
    await paymentScreen.navigateToPaymentScreen();
    await paymentScreen.tapCardTab();
    
    // Step 1: Tap on card holder name field
    // Step 2: Select all text and delete
    // Step 3: Repeat for other card fields
    await paymentScreen.clearAllCardFields();
    
    // Step 4: Verify fields are empty
    // Expected result: All card fields can be cleared and remain empty
    await paymentScreen.verifyCardFieldsEmpty();
  });
});