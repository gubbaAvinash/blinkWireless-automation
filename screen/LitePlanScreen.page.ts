import { litePlanLocators } from "./LitePlanScreen.page";
import { pricePlanLocators } from "./PricePlanScreen.page";
import { productDetailScreen } from "./ProductDetailScreen.page";

const litePlanLocators = {
  litePlanLabel: () => $('~repeat_item_0_label2_caption'),
  litePlanPrice: () => $('~repeat_item_0_label4_caption'),
  addLiteButton: () => $('~repeat_item_0_addPlanBtn_caption'),
  removeLiteButton: () => $('~repeat_item_0_removePlanBtn_caption'),
  unlimitedTalkTextDataFeature: () => $('~repeat_item_0_Title_caption'),
  unlimitedSpeedFeature: () => $('~repeat_item_2_Title_caption'),
  totalPrice: () => $('~label1_caption'),
  continueButton: () => $('~wizardcontinuebtn_caption'),
  cancelButton: () => $('~cancelBtn_caption')
};

class LitePlanScreen {
  async navigateToLitePlanScreen() {
    await productDetailScreen.launchApp();
    await productDetailScreen.tapBuyButton();
    await pricePlanLocators.pricePlanTitle().waitForDisplayed();
    // Navigate to screen where LITE plan is available
    await driver.pause(2000);
  }

  async addLitePlan() {
    await litePlanLocators.addLiteButton().waitForDisplayed();
    await litePlanLocators.addLiteButton().click();
  }

  async removeLitePlan() {
    await litePlanLocators.removeLiteButton().waitForDisplayed();
    await litePlanLocators.removeLiteButton().click();
  }

  async verifyLitePlanAdded() {
    await expect(litePlanLocators.removeLiteButton()).toBeDisplayed();
  }

  async verifyLitePlanRemoved() {
    await expect(litePlanLocators.addLiteButton()).toBeDisplayed();
  }

  async verifyTotalPriceCalculation(expectedPrice: string) {
    await expect(litePlanLocators.totalPrice()).toBeDisplayed();
    const priceText = await litePlanLocators.totalPrice().getText();
    expect(priceText).toBe(expectedPrice);
  }
}

const litePlanScreen = new LitePlanScreen();

export { litePlanScreen, litePlanLocators };