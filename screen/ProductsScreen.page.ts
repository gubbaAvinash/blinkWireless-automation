import { homeScreen } from "./HomeScreen.page";

const productsScreenLocators = {
  pageTitle:          () => $('//android.widget.TextView[@resource-id="mobile_navbar1_title"]'),
  backButton:         () => $('//android.view.ViewGroup[@resource-id="mobile_navbar1_backBtn"]'),
  searchBar:          () => $('//android.widget.EditText[@resource-id="searchBar_i"]'),
  phoneList:          () => $('//android.view.ViewGroup[@resource-id="listPhones_list"]'),
  firstPhoneItem:     () => $('(//android.view.ViewGroup[contains(@resource-id,"listPhones_listitem")])[1]'),
  phoneBrandFilter:   () => $('//android.view.ViewGroup[@resource-id="containerCarrrier_a"]'),
  phoneImage:         () => $('(//android.widget.ImageView[contains(@content-desc,"_picture")])[1]'),
  phoneName:          () => $('(//android.widget.TextView[contains(@resource-id,"phoneName")])[1]'),
  phonePrice:         () => $('(//android.widget.TextView[contains(@resource-id,"phonePrice")])[1]'),
  noResultsText:      () => $('//android.widget.TextView[contains(@resource-id,"noResults") or contains(@text,"No results")]'),
  sortButton:         () => $('//android.view.ViewGroup[@resource-id="sortBtn_a"]'),
  filterButton:       () => $('//android.view.ViewGroup[@resource-id="filterBtn_a"]'),
};

class ProductsScreen {
  async navigateToProducts() {
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapShopPhoneButton();
    await productsScreenLocators.pageTitle().waitForDisplayed({ timeout: 15000 });
  }

  async verifyProductsScreenDisplayed() {
    await productsScreenLocators.pageTitle().waitForDisplayed({ timeout: 15000 });
    await expect(productsScreenLocators.phoneList()).toBeDisplayed();
  }

  async searchForPhone(phoneName: string) {
    await productsScreenLocators.searchBar().waitForDisplayed();
    await productsScreenLocators.searchBar().click();
    await productsScreenLocators.searchBar().clearValue();
    await productsScreenLocators.searchBar().setValue(phoneName);
    await driver.pause(1000);
  }

  async tapFirstPhoneItem() {
    await productsScreenLocators.firstPhoneItem().waitForDisplayed({ timeout: 10000 });
    await productsScreenLocators.firstPhoneItem().click();
  }

  async tapBackButton() {
    await productsScreenLocators.backButton().waitForDisplayed();
    await productsScreenLocators.backButton().click();
  }

  async tapSortButton() {
    await productsScreenLocators.sortButton().waitForDisplayed();
    await productsScreenLocators.sortButton().click();
  }

  async tapFilterButton() {
    await productsScreenLocators.filterButton().waitForDisplayed();
    await productsScreenLocators.filterButton().click();
  }

  async tapPhoneBrandFilter() {
    await productsScreenLocators.phoneBrandFilter().waitForDisplayed();
    await productsScreenLocators.phoneBrandFilter().click();
  }

  async scrollDownProductList() {
    await driver.execute('mobile: scrollGesture', {
      left: 100, top: 300, width: 300, height: 600,
      direction: 'down',
      percent: 2.0,
    });
  }

  async verifyProductListVisible() {
    await expect(productsScreenLocators.phoneList()).toBeDisplayed();
  }

  async verifyNoResultsDisplayed() {
    await productsScreenLocators.noResultsText().waitForDisplayed({ timeout: 5000 });
    await expect(productsScreenLocators.noResultsText()).toBeDisplayed();
  }
}

const productsScreen = new ProductsScreen();

export { productsScreen, productsScreenLocators };
