import { shopPhonesScreen } from "./ShopPhonesScreen.page";
import { xperiaDetailLocators } from "./XperiaDetailScreen.page";

const xperiaDetailLocators = {
  pageTitle: () => $('~mobile_navbar1_title'),
  backButton: () => $('~mobile_navbar1_backbtn_a'),
  imageCarousel: () => $('//android.view.ViewGroup[@bounds="[448,1146][632,1162]"]'),
  overviewTab: () => $('~tabs1_headers_0_title'),
  featuresTab: () => $('~tabs1_headers_1_title'),
  colorsLabel: () => $('~label1_caption'),
  blackColorOption: () => $('~listProductColors_item0'),
  purpleColorOption: () => $('~listProductColors_item1'),
  storageLabel: () => $('~label2_caption'),
  storage128GB: () => $('~switch2_label0'),
  storage256GB: () => $('~switch2_label1'),
  simLabel: () => $('~label3_caption'),
  simCompatibilityText: () => $('~label4_caption'),
  priceDisplay: () => $('~label8_caption'),
  buyButton: () => $('~button2_caption')
};

class XperiaDetailScreen {
  async navigateToXperiaDetail() {
    await shopPhonesScreen.navigateToShopPhones();
    await shopPhonesScreen.tapXperiaProduct();
    await xperiaDetailLocators.pageTitle().waitForDisplayed();
  }

  async verifyXperiaDetailScreenDisplayed() {
    await expect(xperiaDetailLocators.pageTitle()).toHaveText('Xperia');
    await expect(xperiaDetailLocators.overviewTab()).toBeDisplayed();
    await expect(xperiaDetailLocators.featuresTab()).toBeDisplayed();
  }

  async tapBackButton() {
    await xperiaDetailLocators.backButton().click();
  }

  async swipeImageCarouselLeft() {
    const carousel = await xperiaDetailLocators.imageCarousel();
    await carousel.touchAction([
      { action: 'press', x: 600, y: 1154 },
      { action: 'moveTo', x: 400, y: 1154 },
      { action: 'release' }
    ]);
  }

  async swipeImageCarouselRight() {
    const carousel = await xperiaDetailLocators.imageCarousel();
    await carousel.touchAction([
      { action: 'press', x: 400, y: 1154 },
      { action: 'moveTo', x: 600, y: 1154 },
      { action: 'release' }
    ]);
  }

  async tapOverviewTab() {
    await xperiaDetailLocators.overviewTab().click();
  }

  async tapFeaturesTab() {
    await xperiaDetailLocators.featuresTab().click();
  }

  async selectBlackColor() {
    await xperiaDetailLocators.blackColorOption().click();
  }

  async selectPurpleColor() {
    await xperiaDetailLocators.purpleColorOption().click();
  }

  async select128GBStorage() {
    await xperiaDetailLocators.storage128GB().click();
  }

  async select256GBStorage() {
    await xperiaDetailLocators.storage256GB().click();
  }

  async tapBuyButton() {
    await xperiaDetailLocators.buyButton().click();
  }

  async rapidTapBuyButton(times: number = 5) {
    for (let i = 0; i < times; i++) {
      await xperiaDetailLocators.buyButton().click();
      await driver.pause(100);
    }
  }

  async getCurrentPrice() {
    return await xperiaDetailLocators.priceDisplay().getText();
  }

  async verifyPriceDisplayed(expectedPrice: string) {
    await expect(xperiaDetailLocators.priceDisplay()).toHaveText(expectedPrice);
  }

  async verifySIMCompatibilityDisplayed() {
    await expect(xperiaDetailLocators.simLabel()).toHaveText('SIM');
    await expect(xperiaDetailLocators.simCompatibilityText()).toHaveText('Both physical & eSIMs are supported on this device.');
  }

  async verifyTabSelected(tabName: string) {
    if (tabName === 'Overview') {
      await expect(xperiaDetailLocators.overviewTab()).toBeDisplayed();
    } else if (tabName === 'Features') {
      await expect(xperiaDetailLocators.featuresTab()).toBeDisplayed();
    }
  }
}

const xperiaDetailScreen = new XperiaDetailScreen();

export { xperiaDetailScreen, xperiaDetailLocators };