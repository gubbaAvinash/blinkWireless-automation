import { productDetailLocators } from "./ProductDetailScreen.page";

const productDetailLocators = {
  backArrow: () => $('~mobile_navbar1_backbtn_a'),
  xperiaHeading: () => $('~mobile_navbar1_title'),
  productImage: () => $('~repeat_item_0_picture5_picture'),
  overviewTab: () => $('~tabs1_headers_0_title'),
  featuresTab: () => $('~tabs1_headers_1_title'),
  colorsLabel: () => $('~label1_caption'),
  blackColorOption: () => $('~listProductColors_item0'),
  purpleColorOption: () => $('~listProductColors_item1'),
  storageLabel: () => $('~label2_caption'),
  storage128GB: () => $('~switch2_label0'),
  storage256GB: () => $('~switch2_label1'),
  simLabel: () => $('~label3_caption'),
  simSupportText: () => $('~label4_caption'),
  productPrice: () => $('~label8_caption'),
  buyButton: () => $('~button2_caption'),
  pageIndicatorDots: () => $('//android.view.ViewGroup[@bounds="[448,1146][632,1162]"]')
};

class ProductDetailScreen {
  async launchApp() {
    await driver.activateApp('com.wavemaker.turbomobiles');
    await this.waitForProductDetailScreen();
  }

  async waitForProductDetailScreen() {
    await productDetailLocators.xperiaHeading().waitForDisplayed({ timeout: 10000 });
    await productDetailLocators.buyButton().waitForDisplayed({ timeout: 10000 });
  }

  async tapBackArrow() {
    await productDetailLocators.backArrow().waitForDisplayed();
    await productDetailLocators.backArrow().click();
  }

  async selectBlackColor() {
    await productDetailLocators.blackColorOption().waitForDisplayed();
    await productDetailLocators.blackColorOption().click();
  }

  async selectPurpleColor() {
    await productDetailLocators.purpleColorOption().waitForDisplayed();
    await productDetailLocators.purpleColorOption().click();
  }

  async tapBuyButton() {
    await productDetailLocators.buyButton().waitForDisplayed();
    await productDetailLocators.buyButton().click();
  }

  async switchToFeaturesTab() {
    await productDetailLocators.featuresTab().waitForDisplayed();
    await productDetailLocators.featuresTab().click();
  }

  async switchToOverviewTab() {
    await productDetailLocators.overviewTab().waitForDisplayed();
    await productDetailLocators.overviewTab().click();
  }

  async swipeProductImage() {
    await productDetailLocators.productImage().waitForDisplayed();
    const imageElement = await productDetailLocators.productImage();
    await imageElement.touchAction([
      { action: 'press', x: 700, y: 750 },
      { action: 'wait', ms: 500 },
      { action: 'moveTo', x: 300, y: 750 },
      { action: 'release' }
    ]);
  }

  async verifyProductDetailScreenDisplayed() {
    await expect(productDetailLocators.xperiaHeading()).toBeDisplayed();
    await expect(productDetailLocators.productImage()).toBeDisplayed();
    await expect(productDetailLocators.buyButton()).toBeDisplayed();
  }

  async verifyColorSelection(color: string) {
    if (color === 'black') {
      await expect(productDetailLocators.blackColorOption()).toBeDisplayed();
    } else if (color === 'purple') {
      await expect(productDetailLocators.purpleColorOption()).toBeDisplayed();
    }
  }

  async verifyTabActive(tabName: string) {
    if (tabName === 'overview') {
      await expect(productDetailLocators.overviewTab()).toBeDisplayed();
    } else if (tabName === 'features') {
      await expect(productDetailLocators.featuresTab()).toBeDisplayed();
    }
  }

  async verifyPageIndicatorsUpdate() {
    await expect(productDetailLocators.pageIndicatorDots()).toBeDisplayed();
  }
}

const productDetailScreen = new ProductDetailScreen();

export { productDetailScreen, productDetailLocators };