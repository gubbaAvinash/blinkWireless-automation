import { productDetailScreen } from "./ProductDetailScreen.page";

const featuresScreenLocators = {
  appleIntelligenceFeature: () => $('~repeat_item_0_Text_caption'),
  a18ProChipFeature: () => $('~repeat_item_1_Text_caption'),
  cameraControlFeature: () => $('~repeat_item_2_Text_caption'),
  proCameraSystemFeature: () => $('~repeat_item_3_Text_caption'),
  batteryLifeFeature: () => $('~repeat_item_4_Text_caption'),
  productPrice: () => $('~label8_caption'),
  buyButton: () => $('~button2_caption')
};

class FeaturesScreen {
  async navigateToFeaturesTab() {
    await productDetailScreen.launchApp();
    await productDetailScreen.switchToFeaturesTab();
    await featuresScreenLocators.appleIntelligenceFeature().waitForDisplayed();
  }

  async tapAppleIntelligenceFeature() {
    await featuresScreenLocators.appleIntelligenceFeature().waitForDisplayed();
    await featuresScreenLocators.appleIntelligenceFeature().click();
  }

  async tapA18ProChipFeature() {
    await featuresScreenLocators.a18ProChipFeature().waitForDisplayed();
    await featuresScreenLocators.a18ProChipFeature().click();
  }

  async tapCameraControlFeature() {
    await featuresScreenLocators.cameraControlFeature().waitForDisplayed();
    await featuresScreenLocators.cameraControlFeature().click();
  }

  async verifyFeaturesDisplayed() {
    await expect(featuresScreenLocators.appleIntelligenceFeature()).toBeDisplayed();
    await expect(featuresScreenLocators.a18ProChipFeature()).toBeDisplayed();
    await expect(featuresScreenLocators.cameraControlFeature()).toBeDisplayed();
  }
}

const featuresScreen = new FeaturesScreen();

export { featuresScreen, featuresScreenLocators };