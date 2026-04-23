import { pricePlanLocators } from "./PricePlanScreen.page";
import { productDetailScreen } from "./ProductDetailScreen.page";

const pricePlanLocators = {
  progressIndicator: () => $('~mobile_navbar1_backbtn_caption'),
  pricePlanTitle: () => $('~mobile_navbar1_title'),
  cancelButton: () => $('~cancelBtn_caption'),
  recommendedBadge: () => $('~repeat_item_1_label54_caption'),
  basicPlanLabel: () => $('~repeat_item_1_label2_caption'),
  basicPlanPrice: () => $('~repeat_item_1_label4_caption'),
  taxesFeesText: () => $('~repeat_item_1_label5_caption'),
  networkIcon: () => $('~repeat_item_1_label5_1_caption'),
  fiveGNationwideFeature: () => $('~repeat_item_1_Title_caption'),
  fiveGUltraWidebandFeature: () => $('~repeat_item_2_Title_caption'),
  dataAllowanceFeature: () => $('~repeat_item_3_Title_caption'),
  travelInternationalHeader: () => $('~repeat_item_1_label6_caption'),
  premiumNetworkFeature: () => $('~repeat_item_0_label67_caption'),
  lowFlatRateCallingFeature: () => $('~repeat_item_1_label67_caption'),
  extraHeader: () => $('~repeat_item_1_label67_1_caption'),
  noAnnualContractFeature: () => $('~repeat_item_0_label69_caption'),
  totalPrice: () => $('~label1_caption'),
  continueButton: () => $('~wizardcontinuebtn_caption')
};

class PricePlanScreen {
  async navigateToPricePlan() {
    await productDetailScreen.launchApp();
    await productDetailScreen.tapBuyButton();
    await pricePlanLocators.pricePlanTitle().waitForDisplayed();
  }

  async tapCancelButton() {
    await pricePlanLocators.cancelButton().waitForDisplayed();
    await pricePlanLocators.cancelButton().click();
  }

  async selectBasicPlan() {
    await pricePlanLocators.basicPlanLabel().waitForDisplayed();
    await pricePlanLocators.basicPlanLabel().click();
  }

  async tapContinueButton() {
    await pricePlanLocators.continueButton().waitForDisplayed();
    await pricePlanLocators.continueButton().click();
  }

  async verifyPricePlanScreenDisplayed() {
    await expect(pricePlanLocators.pricePlanTitle()).toBeDisplayed();
    await expect(pricePlanLocators.basicPlanLabel()).toBeDisplayed();
    await expect(pricePlanLocators.continueButton()).toBeDisplayed();
  }

  async verifyBasicPlanSelected() {
    await expect(pricePlanLocators.basicPlanLabel()).toBeDisplayed();
    // Additional verification logic for selection state can be added here
  }

  async verifyProgressIndicator() {
    await expect(pricePlanLocators.progressIndicator()).toBeDisplayed();
    const progressText = await pricePlanLocators.progressIndicator().getText();
    expect(progressText).toBe('1/5');
  }

  async verifyRecommendedPlanIndication() {
    await expect(pricePlanLocators.recommendedBadge()).toBeDisplayed();
    const badgeText = await pricePlanLocators.recommendedBadge().getText();
    expect(badgeText).toBe('RECOMMENDED');
  }

  async verifyPlanFeatures() {
    await expect(pricePlanLocators.fiveGNationwideFeature()).toBeDisplayed();
    await expect(pricePlanLocators.premiumNetworkFeature()).toBeDisplayed();
    await expect(pricePlanLocators.noAnnualContractFeature()).toBeDisplayed();
  }

  async verifyTotalPrice(expectedPrice: string) {
    await expect(pricePlanLocators.totalPrice()).toBeDisplayed();
    const priceText = await pricePlanLocators.totalPrice().getText();
    expect(priceText).toBe(expectedPrice);
  }
}

const pricePlanScreen = new PricePlanScreen();

export { pricePlanScreen, pricePlanLocators };