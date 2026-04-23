import { addOnsScreen } from "./AddOnsScreen.page";

const simTypeScreenLocators = {
  backButton: () => $('~mobile_navbar1_backbtn_a'),
  progressIndicator: () => $('~mobile_navbar1_backbtn_caption'),
  simTypeHeading: () => $('~mobile_navbar1_title'),
  cancelButton: () => $('~cancelBtn_caption'),
  instructionText: () => $('~label37_1_caption'),
  physicalSimCard: () => $('~stvSimTypeListList1_item0'),
  physicalSimIcon: () => $('~repeat_item_0_picture9_picture'),
  physicalSimHeading: () => $('~repeat_item_0_label41_1_caption'),
  physicalSimDescription: () => $('~repeat_item_0_label40_1_caption'),
  physicalSimCheckmark: () => $('~repeat_item_0_icon2_icon'),
  esimCard: () => $('~stvSimTypeListList1_item1'),
  esimIcon: () => $('~repeat_item_1_picture9_picture'),
  esimHeading: () => $('~repeat_item_1_label41_1_caption'),
  esimDescription: () => $('~repeat_item_1_label40_1_caption'),
  totalPrice: () => $('~label1_caption'),
  orderDetailsDropdown: () => $('~containerOrderDetails_a'),
  continueButton: () => $('~wizardcontinuebtn_caption')
};

class SimTypeScreen {
  async navigateToSimTypeScreen() {
    await addOnsScreen.launchApp();
    await addOnsScreen.tapContinueButton();
    await simTypeScreenLocators.simTypeHeading().waitForDisplayed();
  }

  async verifySimTypeScreenDisplayed() {
    await simTypeScreenLocators.simTypeHeading().waitForDisplayed();
    await expect(simTypeScreenLocators.simTypeHeading()).toHaveText('Sim Type');
    const progressText = await simTypeScreenLocators.progressIndicator().getText();
    await expect(progressText).toMatch(/3\/[56]/);
  }

  async selectPhysicalSim() {
    await simTypeScreenLocators.physicalSimCard().waitForDisplayed();
    await simTypeScreenLocators.physicalSimCard().click();
  }

  async selectEsim() {
    await simTypeScreenLocators.esimCard().waitForDisplayed();
    await simTypeScreenLocators.esimCard().click();
  }

  async tapBackButton() {
    await simTypeScreenLocators.backButton().waitForDisplayed();
    await simTypeScreenLocators.backButton().click();
  }

  async tapCancelButton() {
    await simTypeScreenLocators.cancelButton().waitForDisplayed();
    await simTypeScreenLocators.cancelButton().click();
  }

  async tapContinueButton() {
    await simTypeScreenLocators.continueButton().waitForDisplayed();
    await simTypeScreenLocators.continueButton().click();
  }

  async tapOrderDetails() {
    await simTypeScreenLocators.orderDetailsDropdown().waitForDisplayed();
    await simTypeScreenLocators.orderDetailsDropdown().click();
  }
}

const simTypeScreen = new SimTypeScreen();

export { simTypeScreen, simTypeScreenLocators };