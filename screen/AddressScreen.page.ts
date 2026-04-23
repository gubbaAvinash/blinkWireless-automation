const addressScreenLocators = {
  backArrow: () => $('~mobile_navbar1_backbtn_a'),
  progressIndicator: () => $('~mobile_navbar1_backbtn_caption'),
  addressHeader: () => $('~mobile_navbar1_title'),
  cancelButton: () => $('~cancelBtn_caption'),
  deliveryInstructionText: () => $('~label49_1_caption'),
  addressLine1Field: () => $('~addressLine1_i'),
  addressLine2Field: () => $('~addressLine2_i'),
  cityField: () => $('~city_i'),
  zipField: () => $('~zip_i'),
  stateDropdown: () => $('~state_i'),
  texasOption: () => $('~state_label0'),
  virginiaOption: () => $('~state_label1'),
  washingtonOption: () => $('~state_label2'),
  newYorkOption: () => $('~state_label3'),
  californiaOption: () => $('~state_label4'),
  stateErrorMessage: () => $('~state_error_msg'),
  orderTotal: () => $('~label1_caption'),
  orderDetailsDropdown: () => $('~label42_2_caption'),
  orderDetailsContainer: () => $('~containerOrderDetails_a'),
  continueButton: () => $('~wizardcontinuebtn_caption')
};

class AddressScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await driver.pause(2000);
  }

  async navigateToAddressScreen() {
    await this.launchApp();
    // Add navigation steps from previous screens if needed
    await addressScreenLocators.addressHeader().waitForDisplayed();
  }

  async tapBackArrow() {
    await addressScreenLocators.backArrow().waitForDisplayed();
    await addressScreenLocators.backArrow().click();
  }

  async tapCancelButton() {
    await addressScreenLocators.cancelButton().waitForDisplayed();
    await addressScreenLocators.cancelButton().click();
  }

  async enterAddressLine1(address: string) {
    await addressScreenLocators.addressLine1Field().waitForDisplayed();
    await addressScreenLocators.addressLine1Field().click();
    await addressScreenLocators.addressLine1Field().clearValue();
    await addressScreenLocators.addressLine1Field().setValue(address);
  }

  async enterAddressLine2(address: string) {
    await addressScreenLocators.addressLine2Field().waitForDisplayed();
    await addressScreenLocators.addressLine2Field().click();
    await addressScreenLocators.addressLine2Field().clearValue();
    await addressScreenLocators.addressLine2Field().setValue(address);
  }

  async enterCity(city: string) {
    await addressScreenLocators.cityField().waitForDisplayed();
    await addressScreenLocators.cityField().click();
    await addressScreenLocators.cityField().clearValue();
    await addressScreenLocators.cityField().setValue(city);
  }

  async enterZipCode(zip: string) {
    await addressScreenLocators.zipField().waitForDisplayed();
    await addressScreenLocators.zipField().click();
    await addressScreenLocators.zipField().clearValue();
    await addressScreenLocators.zipField().setValue(zip);
  }

  async selectState(state: string) {
    await addressScreenLocators.stateDropdown().waitForDisplayed();
    await addressScreenLocators.stateDropdown().click();
    
    switch (state.toLowerCase()) {
      case 'texas':
        await addressScreenLocators.texasOption().click();
        break;
      case 'virginia':
        await addressScreenLocators.virginiaOption().click();
        break;
      case 'washington':
        await addressScreenLocators.washingtonOption().click();
        break;
      case 'new york':
        await addressScreenLocators.newYorkOption().click();
        break;
      case 'california':
        await addressScreenLocators.californiaOption().click();
        break;
    }
  }

  async tapContinueButton() {
    await addressScreenLocators.continueButton().waitForDisplayed();
    await addressScreenLocators.continueButton().click();
  }

  async tapOrderDetailsDropdown() {
    await addressScreenLocators.orderDetailsContainer().waitForDisplayed();
    await addressScreenLocators.orderDetailsContainer().click();
  }

  async clearAddressField(fieldName: string) {
    let field;
    switch (fieldName.toLowerCase()) {
      case 'address1':
        field = addressScreenLocators.addressLine1Field();
        break;
      case 'address2':
        field = addressScreenLocators.addressLine2Field();
        break;
      case 'city':
        field = addressScreenLocators.cityField();
        break;
      case 'zip':
        field = addressScreenLocators.zipField();
        break;
    }
    if (field) {
      await field.click();
      await field.clearValue();
    }
  }

  async longPressAddressField(fieldName: string) {
    let field;
    switch (fieldName.toLowerCase()) {
      case 'address1':
        field = addressScreenLocators.addressLine1Field();
        break;
      case 'address2':
        field = addressScreenLocators.addressLine2Field();
        break;
      case 'city':
        field = addressScreenLocators.cityField();
        break;
      case 'zip':
        field = addressScreenLocators.zipField();
        break;
    }
    if (field) {
      await field.waitForDisplayed();
      await driver.touchAction([
        { action: 'longPress', element: field }
      ]);
    }
  }

  async verifyProgressIndicator(expectedStep: string) {
    await addressScreenLocators.progressIndicator().waitForDisplayed();
    const actualStep = await addressScreenLocators.progressIndicator().getText();
    expect(actualStep).toBe(expectedStep);
  }

  async verifyOrderTotal(expectedTotal: string) {
    await addressScreenLocators.orderTotal().waitForDisplayed();
    const actualTotal = await addressScreenLocators.orderTotal().getText();
    expect(actualTotal).toBe(expectedTotal);
  }

  async verifyStateErrorMessage() {
    await addressScreenLocators.stateErrorMessage().waitForDisplayed();
    const errorText = await addressScreenLocators.stateErrorMessage().getText();
    expect(errorText).toBe('Please select state name');
  }

  async verifyAddressScreenDisplayed() {
    await addressScreenLocators.addressHeader().waitForDisplayed();
    const headerText = await addressScreenLocators.addressHeader().getText();
    expect(headerText).toBe('Address');
  }

  async fillCompleteAddressForm(addressData: any) {
    await this.enterAddressLine1(addressData.address1);
    await this.enterAddressLine2(addressData.address2);
    await this.enterCity(addressData.city);
    await this.enterZipCode(addressData.zip);
    await this.selectState(addressData.state);
  }

  async verifyFieldValue(fieldName: string, expectedValue: string) {
    let field;
    switch (fieldName.toLowerCase()) {
      case 'address1':
        field = addressScreenLocators.addressLine1Field();
        break;
      case 'address2':
        field = addressScreenLocators.addressLine2Field();
        break;
      case 'city':
        field = addressScreenLocators.cityField();
        break;
      case 'zip':
        field = addressScreenLocators.zipField();
        break;
      case 'state':
        field = addressScreenLocators.stateDropdown();
        break;
    }
    if (field) {
      const actualValue = await field.getText();
      expect(actualValue).toBe(expectedValue);
    }
  }
}

const addressScreen = new AddressScreen();

export { addressScreen, addressScreenLocators };