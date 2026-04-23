import { shopPhonesLocators } from "./ShopPhonesScreen.page";

const shopPhonesLocators = {
  pageTitle: () => $('~mobile_navbar1_title'),
  backButton: () => $('~mobile_navbar1_backbtn_a'),
  iPhone14Image: () => $('~repeat_item_0_pictureProduct_picture'),
  iPhone14Title: () => $('~repeat_item_0_labelName_caption'),
  iPhone14BlueColor: () => $('~repeat_item_0_stvColorsList1_item0'),
  iPhone14RedColor: () => $('~repeat_item_0_stvColorsList1_item1'),
  iPhone13MiniImage: () => $('~repeat_item_1_pictureProduct_picture'),
  iPhone13MiniTitle: () => $('~repeat_item_1_labelName_caption'),
  iPhone13MiniBlackColor: () => $('~repeat_item_1_stvColorsList1_item0'),
  iPhone13MiniPrice: () => $('~repeat_item_1_labelPrice_caption'),
  xperiaImage: () => $('~repeat_item_2_pictureProduct_picture'),
  xperiaTitle: () => $('~repeat_item_2_labelName_caption'),
  xperiaPurpleColor: () => $('~repeat_item_2_stvColorsList1_item1'),
  xperiaPrice: () => $('~repeat_item_2_labelPrice_caption'),
  colorsLabel: () => $('~repeat_item_0_label4_caption'),
  fromLabel: () => $('~repeat_item_0_label5_caption'),
  taxesFeesText: () => $('~repeat_item_0_label7_caption')
};

class ShopPhonesScreen {
  async navigateToShopPhones() {
    // Navigation logic would depend on app flow
    await shopPhonesLocators.pageTitle().waitForDisplayed({ timeout: 10000 });
  }

  async verifyShopPhonesScreenDisplayed() {
    await expect(shopPhonesLocators.pageTitle()).toHaveText('Shop Phones');
    await expect(shopPhonesLocators.backButton()).toBeDisplayed();
  }

  async tapBackButton() {
    await shopPhonesLocators.backButton().click();
  }

  async selectiPhone14BlueColor() {
    await shopPhonesLocators.iPhone14BlueColor().waitForDisplayed();
    await shopPhonesLocators.iPhone14BlueColor().click();
  }

  async selectiPhone14RedColor() {
    await shopPhonesLocators.iPhone14RedColor().waitForDisplayed();
    await shopPhonesLocators.iPhone14RedColor().click();
  }

  async selectXperiaPurpleColor() {
    await shopPhonesLocators.xperiaPurpleColor().waitForDisplayed();
    await shopPhonesLocators.xperiaPurpleColor().click();
  }

  async tapXperiaProduct() {
    await shopPhonesLocators.xperiaImage().click();
  }

  async verifyProductDisplayed(productName: string) {
    const productTitle = await $(`~repeat_item_*_labelName_caption`);
    await expect(productTitle).toHaveTextContaining(productName);
  }

  async verifyPriceDisplayed(expectedPrice: string) {
    const priceElement = await $(`~*_labelPrice_caption`);
    await expect(priceElement).toHaveText(expectedPrice);
  }

  async scrollToProduct(productName: string) {
    await driver.execute('mobile: scroll', { direction: 'down' });
  }
}

const shopPhonesScreen = new ShopPhonesScreen();

export { shopPhonesScreen, shopPhonesLocators };