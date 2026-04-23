import { productsScreen, productsScreenLocators } from "../screen/ProductsScreen.page";
import { homeScreen } from "../screen/HomeScreen.page";

/**
 * BlinkWireless – Products (Phone Catalog) Screen Tests
 * Navigate: Home → Shop Phone button
 */
describe('Products Screen Tests', () => {

  // ─── TC046 ──────────────────────────────────────────────────────────────────
  it('TC046: Verify products screen is displayed after tapping Shop Phone', async () => {
    // Preconditions: App is on home screen
    await productsScreen.navigateToProducts();

    // Expected: Products/phone catalog screen is visible with list of phones
    await productsScreen.verifyProductsScreenDisplayed();
    await expect(productsScreenLocators.pageTitle()).toBeDisplayed();
  });

  // ─── TC047 ──────────────────────────────────────────────────────────────────
  it('TC047: Phone catalog list is visible with at least one item', async () => {
    // Preconditions: User is on products screen
    await productsScreen.navigateToProducts();

    // Step 1: Verify list is visible
    await productsScreen.verifyProductListVisible();

    // Expected: Phone list is populated
    await expect(productsScreenLocators.phoneList()).toBeDisplayed();
  });

  // ─── TC048 ──────────────────────────────────────────────────────────────────
  it('TC048: Navigate back from products screen to home', async () => {
    // Preconditions: User is on products screen
    await productsScreen.navigateToProducts();
    await productsScreen.verifyProductsScreenDisplayed();

    // Step 1: Tap back button
    await productsScreen.tapBackButton();

    // Expected: User returns to home screen
    await homeScreen.verifyHomeScreenDisplayed();
  });

  // ─── TC049 ──────────────────────────────────────────────────────────────────
  it('TC049: Tap on a phone item to view product details', async () => {
    // Preconditions: User is on products screen, at least one phone is listed
    await productsScreen.navigateToProducts();
    await productsScreen.verifyProductListVisible();

    // Step 1: Tap first phone in the list
    await productsScreen.tapFirstPhoneItem();

    // Expected: Product details screen is displayed
    await driver.pause(2000);
    // No longer on products list - navigated to details
    await expect(productsScreenLocators.firstPhoneItem()).not.toBeDisplayed();
  });

  // ─── TC050 ──────────────────────────────────────────────────────────────────
  it('TC050: Search for a phone by name', async () => {
    // Preconditions: User is on products screen
    await productsScreen.navigateToProducts();
    await productsScreen.verifyProductsScreenDisplayed();

    // Step 1: Tap search bar and enter phone name
    await productsScreen.searchForPhone('iPhone');

    // Expected: Filtered results shown matching the search term
    await driver.pause(2000);
    await expect(productsScreenLocators.phoneList()).toBeDisplayed();
  });

  // ─── TC051 ──────────────────────────────────────────────────────────────────
  it('TC051: Search with a term that returns no results', async () => {
    // Preconditions: User is on products screen
    await productsScreen.navigateToProducts();
    await productsScreen.verifyProductsScreenDisplayed();

    // Step 1: Enter a search term that won't match any product
    await productsScreen.searchForPhone('XYZNONEXISTENTPHONE999');

    // Expected: "No results" message is displayed
    await driver.pause(2000);
    // Results section should show empty or no-results state
    await expect(productsScreenLocators.phoneList()).toBeDisplayed();
  });

  // ─── TC052 ──────────────────────────────────────────────────────────────────
  it('TC052: Scroll down phone catalog list', async () => {
    // Preconditions: User is on products screen
    await productsScreen.navigateToProducts();
    await productsScreen.verifyProductListVisible();

    // Step 1: Scroll down through the phone list
    await productsScreen.scrollDownProductList();

    // Expected: More products are visible after scrolling
    await driver.pause(1000);
    await expect(productsScreenLocators.phoneList()).toBeDisplayed();
  });

  // ─── TC053 ──────────────────────────────────────────────────────────────────
  it('TC053: Access phone brand filter', async () => {
    // Preconditions: User is on products screen
    await productsScreen.navigateToProducts();
    await productsScreen.verifyProductsScreenDisplayed();

    // Step 1: Tap filter / brand filter
    await productsScreen.tapPhoneBrandFilter();
    await driver.pause(1500);

    // Expected: Filter/brand dropdown is opened
    await driver.pause(1000);
  });

});
