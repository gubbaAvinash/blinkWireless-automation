import { productsScreen } from "./ProductsScreen.page";

const productDetailsScreenLocators = {
  pageTitle:          () => $('//android.widget.TextView[@resource-id="mobile_navbar1_title"]'),
  backButton:         () => $('//android.view.ViewGroup[@resource-id="mobile_navbar1_backBtn"]'),
  productImage:       () => $('//android.widget.ImageView[@content-desc="productImage_picture"]'),
  productName:        () => $('//android.widget.TextView[@resource-id="labelProductName_caption"]'),
  productPrice:       () => $('//android.widget.TextView[@resource-id="labelProductPrice_caption"]'),
  productDescription: () => $('//android.widget.TextView[@resource-id="labelProductDescription_caption"]'),
  colorSelector:      () => $('//android.view.ViewGroup[@resource-id="containerColors_a"]'),
  storageSizeSelector:() => $('//android.view.ViewGroup[@resource-id="containerStorageSizes_a"]'),
  addToCartButton:    () => $('//android.widget.TextView[@resource-id="btnAddToCart_caption"]'),
  buyNowButton:       () => $('//android.widget.TextView[@resource-id="btnBuyNow_caption"]'),
  specsTab:           () => $('//android.widget.TextView[@resource-id="tabSpecs_caption"]'),
  featuresTab:        () => $('//android.widget.TextView[@resource-id="tabFeatures_caption"]'),
  specsList:          () => $('//android.view.ViewGroup[@resource-id="listSpecs_list"]'),
  featuresList:       () => $('//android.view.ViewGroup[@resource-id="listFeatures_list"]'),
};

class ProductDetailsScreen {
  async navigateToProductDetails() {
    await productsScreen.navigateToProducts();
    await productsScreen.verifyProductsScreenDisplayed();
    await productsScreen.tapFirstPhoneItem();
    await productDetailsScreenLocators.productName().waitForDisplayed({ timeout: 15000 });
  }

  async verifyProductDetailsScreenDisplayed() {
    await productDetailsScreenLocators.productName().waitForDisplayed({ timeout: 15000 });
    await expect(productDetailsScreenLocators.productName()).toBeDisplayed();
  }

  async tapBackButton() {
    await productDetailsScreenLocators.backButton().waitForDisplayed();
    await productDetailsScreenLocators.backButton().click();
  }

  async tapAddToCartButton() {
    await productDetailsScreenLocators.addToCartButton().waitForDisplayed();
    await productDetailsScreenLocators.addToCartButton().click();
  }

  async tapBuyNowButton() {
    await productDetailsScreenLocators.buyNowButton().waitForDisplayed();
    await productDetailsScreenLocators.buyNowButton().click();
  }

  async tapColorSelector() {
    await productDetailsScreenLocators.colorSelector().waitForDisplayed();
    await productDetailsScreenLocators.colorSelector().click();
  }

  async tapStorageSizeSelector() {
    await productDetailsScreenLocators.storageSizeSelector().waitForDisplayed();
    await productDetailsScreenLocators.storageSizeSelector().click();
  }

  async tapSpecsTab() {
    await productDetailsScreenLocators.specsTab().waitForDisplayed();
    await productDetailsScreenLocators.specsTab().click();
  }

  async tapFeaturesTab() {
    await productDetailsScreenLocators.featuresTab().waitForDisplayed();
    await productDetailsScreenLocators.featuresTab().click();
  }

  async scrollDownProductDetails() {
    await driver.execute('mobile: scrollGesture', {
      left: 100, top: 300, width: 300, height: 600,
      direction: 'down',
      percent: 2.0,
    });
  }

  async verifyProductNameDisplayed() {
    await expect(productDetailsScreenLocators.productName()).toBeDisplayed();
  }

  async verifyProductPriceDisplayed() {
    await expect(productDetailsScreenLocators.productPrice()).toBeDisplayed();
  }

  async verifyAddToCartButtonEnabled() {
    await expect(productDetailsScreenLocators.addToCartButton()).toBeDisplayed();
    await expect(productDetailsScreenLocators.addToCartButton()).toBeEnabled();
  }
}

const productDetailsScreen = new ProductDetailsScreen();

export { productDetailsScreen, productDetailsScreenLocators };
