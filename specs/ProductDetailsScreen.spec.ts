import { productDetailsScreen, productDetailsScreenLocators } from "../screen/ProductDetailsScreen.page";
import { productsScreen } from "../screen/ProductsScreen.page";

/**
 * BlinkWireless – Product Details Screen Tests
 * Navigate: Home → Shop Phone → tap a phone item
 */
describe('Product Details Screen Tests', () => {

  // ─── TC054 ──────────────────────────────────────────────────────────────────
  it('TC054: Verify product details screen is displayed', async () => {
    // Preconditions: User has tapped on a phone from the catalog
    await productDetailsScreen.navigateToProductDetails();

    // Expected: Product details screen with name, price, and image visible
    await productDetailsScreen.verifyProductDetailsScreenDisplayed();
    await expect(productDetailsScreenLocators.productName()).toBeDisplayed();
  });

  // ─── TC055 ──────────────────────────────────────────────────────────────────
  it('TC055: Verify product name and price are displayed', async () => {
    // Preconditions: User is on product details screen
    await productDetailsScreen.navigateToProductDetails();
    await productDetailsScreen.verifyProductDetailsScreenDisplayed();

    // Step 1: Verify product name is displayed
    await productDetailsScreen.verifyProductNameDisplayed();

    // Step 2: Verify product price is displayed
    await productDetailsScreen.verifyProductPriceDisplayed();
  });

  // ─── TC056 ──────────────────────────────────────────────────────────────────
  it('TC056: Navigate back from product details to catalog', async () => {
    // Preconditions: User is on product details screen
    await productDetailsScreen.navigateToProductDetails();
    await productDetailsScreen.verifyProductDetailsScreenDisplayed();

    // Step 1: Tap back button
    await productDetailsScreen.tapBackButton();

    // Expected: User returns to products catalog screen
    await productsScreen.verifyProductListVisible();
  });

  // ─── TC057 ──────────────────────────────────────────────────────────────────
  it('TC057: Verify Add to Cart button is enabled', async () => {
    // Preconditions: User is on product details screen
    await productDetailsScreen.navigateToProductDetails();
    await productDetailsScreen.verifyProductDetailsScreenDisplayed();

    // Step 1: Scroll down to see Add to Cart button if needed
    await productDetailsScreen.scrollDownProductDetails();

    // Expected: Add to Cart button is visible and enabled
    await productDetailsScreen.verifyAddToCartButtonEnabled();
  });

  // ─── TC058 ──────────────────────────────────────────────────────────────────
  it('TC058: Tap Add to Cart button', async () => {
    // Preconditions: User is on product details screen
    await productDetailsScreen.navigateToProductDetails();
    await productDetailsScreen.verifyProductDetailsScreenDisplayed();
    await productDetailsScreen.scrollDownProductDetails();

    // Step 1: Tap Add to Cart
    await productDetailsScreen.tapAddToCartButton();
    await driver.pause(2000);

    // Expected: Item is added to cart (confirmation shown or cart count updates)
  });

  // ─── TC059 ──────────────────────────────────────────────────────────────────
  it('TC059: Tap color selector on product details', async () => {
    // Preconditions: User is on product details screen
    await productDetailsScreen.navigateToProductDetails();
    await productDetailsScreen.verifyProductDetailsScreenDisplayed();

    // Step 1: Tap color selector
    await productDetailsScreen.tapColorSelector();
    await driver.pause(1500);

    // Expected: Color selection options are displayed
  });

  // ─── TC060 ──────────────────────────────────────────────────────────────────
  it('TC060: Tap storage size selector on product details', async () => {
    // Preconditions: User is on product details screen
    await productDetailsScreen.navigateToProductDetails();
    await productDetailsScreen.verifyProductDetailsScreenDisplayed();

    // Step 1: Tap storage size selector
    await productDetailsScreen.tapStorageSizeSelector();
    await driver.pause(1500);

    // Expected: Storage size options are displayed
  });

  // ─── TC061 ──────────────────────────────────────────────────────────────────
  it('TC061: Scroll through product details to see full description', async () => {
    // Preconditions: User is on product details screen
    await productDetailsScreen.navigateToProductDetails();
    await productDetailsScreen.verifyProductDetailsScreenDisplayed();

    // Step 1: Scroll down
    await productDetailsScreen.scrollDownProductDetails();
    await driver.pause(1000);

    // Expected: Full product description and additional info visible
  });

});
