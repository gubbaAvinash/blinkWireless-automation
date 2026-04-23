const paymentScreenLocators = {
  paymentHeading: () => $('~mobile_navbar1_title'),
  cancelButton: () => $('~cancelBtn_caption'),
  progressIndicator: () => $('~mobile_navbar1_backbtn_caption'),
  instructionText: () => $('~label50_caption'),
  cardTab: () => $('~tabs2_headers_0_title'),
  paypalTab: () => $('~tabs2_headers_1_title'),
  cardHolderNameField: () => $('~cardHolderName_i'),
  cardNumberField: () => $('~cardNumber_i'),
  expiryDateField: () => $('~expiryData_i'),
  orderDetailsText: () => $('~label42_2_caption')
};

class PaymentScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await driver.pause(2000);
  }

  async navigateToPaymentScreen() {
    await this.launchApp();
    // Add navigation steps to reach payment screen
    await paymentScreenLocators.paymentHeading().waitForDisplayed({ timeout: 10000 });
  }

  async verifyPaymentScreenDisplayed() {
    await paymentScreenLocators.paymentHeading().waitForDisplayed();
    await expect(paymentScreenLocators.paymentHeading()).toHaveText('Payment');
    await expect(paymentScreenLocators.progressIndicator()).toHaveText('6/6');
    await expect(paymentScreenLocators.instructionText()).toBeDisplayed();
    await expect(paymentScreenLocators.cardTab()).toBeDisplayed();
    await expect(paymentScreenLocators.paypalTab()).toBeDisplayed();
  }

  async tapCancelButton() {
    await paymentScreenLocators.cancelButton().waitForDisplayed();
    await paymentScreenLocators.cancelButton().click();
  }

  async tapCardTab() {
    await paymentScreenLocators.cardTab().waitForDisplayed();
    await paymentScreenLocators.cardTab().click();
  }

  async tapPaypalTab() {
    await paymentScreenLocators.paypalTab().waitForDisplayed();
    await paymentScreenLocators.paypalTab().click();
  }

  async verifyCardFormDisplayed() {
    await paymentScreenLocators.cardHolderNameField().waitForDisplayed();
    await paymentScreenLocators.cardNumberField().waitForDisplayed();
    await paymentScreenLocators.expiryDateField().waitForDisplayed();
  }

  async enterCardHolderName(name: string) {
    await paymentScreenLocators.cardHolderNameField().waitForDisplayed();
    await paymentScreenLocators.cardHolderNameField().click();
    await paymentScreenLocators.cardHolderNameField().clearValue();
    await paymentScreenLocators.cardHolderNameField().setValue(name);
  }

  async enterCardNumber(cardNumber: string) {
    await paymentScreenLocators.cardNumberField().waitForDisplayed();
    await paymentScreenLocators.cardNumberField().click();
    await paymentScreenLocators.cardNumberField().clearValue();
    await paymentScreenLocators.cardNumberField().setValue(cardNumber);
  }

  async enterExpiryDate(expiryDate: string) {
    await paymentScreenLocators.expiryDateField().waitForDisplayed();
    await paymentScreenLocators.expiryDateField().click();
    await paymentScreenLocators.expiryDateField().clearValue();
    await paymentScreenLocators.expiryDateField().setValue(expiryDate);
  }

  async longPressCardField(fieldType: 'name' | 'number' | 'expiry') {
    let field;
    switch (fieldType) {
      case 'name':
        field = paymentScreenLocators.cardHolderNameField();
        break;
      case 'number':
        field = paymentScreenLocators.cardNumberField();
        break;
      case 'expiry':
        field = paymentScreenLocators.expiryDateField();
        break;
    }
    await field.waitForDisplayed();
    await driver.touchAction([
      { action: 'longPress', element: field }
    ]);
  }

  async clearAllCardFields() {
    await paymentScreenLocators.cardHolderNameField().click();
    await paymentScreenLocators.cardHolderNameField().clearValue();
    await paymentScreenLocators.cardNumberField().click();
    await paymentScreenLocators.cardNumberField().clearValue();
    await paymentScreenLocators.expiryDateField().click();
    await paymentScreenLocators.expiryDateField().clearValue();
  }

  async verifyCardFieldsEmpty() {
    await expect(paymentScreenLocators.cardHolderNameField()).toHaveText('');
    await expect(paymentScreenLocators.cardNumberField()).toHaveText('');
    await expect(paymentScreenLocators.expiryDateField()).toHaveText('');
  }
}

const paymentScreen = new PaymentScreen();

export { paymentScreen, paymentScreenLocators };