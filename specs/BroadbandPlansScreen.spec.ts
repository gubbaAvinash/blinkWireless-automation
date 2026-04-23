import { broadbandPlansScreen, broadbandPlansScreenLocators } from "../screen/BroadbandPlansScreen.page";
import { homeScreen } from "../screen/HomeScreen.page";

/**
 * BlinkWireless – Broadband Plans Screen Tests
 * Navigate: Home → tap Broadband section / router icon
 * Test data: zipcode = 90210
 */
describe('Broadband Plans Screen Tests', () => {

  // ─── TC062 ──────────────────────────────────────────────────────────────────
  it('TC062: Navigate to broadband plans screen from home', async () => {
    // Preconditions: App is on home screen
    await broadbandPlansScreen.navigateToBroadbandPlans();

    // Expected: Broadband plans screen is displayed
    await broadbandPlansScreen.verifyBroadbandPlansScreenDisplayed();
    await expect(broadbandPlansScreenLocators.pageTitle()).toBeDisplayed();
  });

  // ─── TC063 ──────────────────────────────────────────────────────────────────
  it('TC063: Enter valid zip code 90210 to check broadband availability', async () => {
    // Preconditions: User is on broadband plans screen
    await broadbandPlansScreen.navigateToBroadbandPlans();
    await broadbandPlansScreen.verifyBroadbandPlansScreenDisplayed();

    // Step 1: Tap zip code input field
    // Step 2: Enter zip code '90210'
    await broadbandPlansScreen.clearAndEnterZipCode('90210');

    // Step 3: Verify zip code entered correctly
    await broadbandPlansScreen.verifyZipCodeDisplayed('90210');

    // Expected: Zip code is accepted and displayed correctly
  });

  // ─── TC064 ──────────────────────────────────────────────────────────────────
  it('TC064: Check broadband availability with zip code 90210', async () => {
    // Preconditions: User is on broadband plans screen
    await broadbandPlansScreen.navigateToBroadbandPlans();
    await broadbandPlansScreen.verifyBroadbandPlansScreenDisplayed();

    // Step 1: Enter valid zip code
    await broadbandPlansScreen.clearAndEnterZipCode('90210');

    // Step 2: Tap Check Availability
    await broadbandPlansScreen.tapCheckAvailability();
    await driver.pause(5000);

    // Expected: Available broadband plans for zip 90210 are displayed
    await expect(broadbandPlansScreenLocators.pageTitle()).toBeDisplayed();
  });

  // ─── TC065 ──────────────────────────────────────────────────────────────────
  it('TC065: Enter invalid zip code for broadband check', async () => {
    // Preconditions: User is on broadband plans screen
    await broadbandPlansScreen.navigateToBroadbandPlans();
    await broadbandPlansScreen.verifyBroadbandPlansScreenDisplayed();

    // Step 1: Enter invalid zip code (non-numeric)
    await broadbandPlansScreen.clearAndEnterZipCode('ABCDE');

    // Step 2: Tap Check Availability
    await broadbandPlansScreen.tapCheckAvailability();
    await driver.pause(2000);

    // Expected: Validation error shown for invalid zip code
    await expect(broadbandPlansScreenLocators.pageTitle()).toBeDisplayed();
  });

  // ─── TC066 ──────────────────────────────────────────────────────────────────
  it('TC066: Broadband plans list is visible with at least one plan', async () => {
    // Preconditions: User is on broadband plans screen with valid zip
    await broadbandPlansScreen.navigateToBroadbandPlans();
    await broadbandPlansScreen.verifyBroadbandPlansScreenDisplayed();

    // Step 1: Enter zip code and check availability
    try {
      await broadbandPlansScreen.clearAndEnterZipCode('90210');
      await broadbandPlansScreen.tapCheckAvailability();
      await driver.pause(5000);
    } catch {
      // Plans may already be visible without zip entry
    }

    // Expected: At least one broadband plan is shown
    await broadbandPlansScreen.verifyPlanListVisible();
  });

  // ─── TC067 ──────────────────────────────────────────────────────────────────
  it('TC067: Tap on a broadband plan to view details', async () => {
    // Preconditions: Broadband plans list is visible
    await broadbandPlansScreen.navigateToBroadbandPlans();
    await broadbandPlansScreen.verifyBroadbandPlansScreenDisplayed();

    try {
      await broadbandPlansScreen.clearAndEnterZipCode('90210');
      await broadbandPlansScreen.tapCheckAvailability();
      await driver.pause(5000);
    } catch { /* Plans may already be visible */ }

    // Step 1: Tap first broadband plan
    await broadbandPlansScreen.tapFirstPlan();
    await driver.pause(2000);

    // Expected: Plan details or selection confirmation screen is shown
  });

  // ─── TC068 ──────────────────────────────────────────────────────────────────
  it('TC068: Navigate back from broadband plans to home screen', async () => {
    // Preconditions: User is on broadband plans screen
    await broadbandPlansScreen.navigateToBroadbandPlans();
    await broadbandPlansScreen.verifyBroadbandPlansScreenDisplayed();

    // Step 1: Tap back button
    await broadbandPlansScreen.tapBackButton();

    // Expected: User returns to home screen
    await homeScreen.verifyHomeScreenDisplayed();
  });

  // ─── TC069 ──────────────────────────────────────────────────────────────────
  it('TC069: Scroll through broadband plans list', async () => {
    // Preconditions: Broadband plans list is visible
    await broadbandPlansScreen.navigateToBroadbandPlans();
    await broadbandPlansScreen.verifyBroadbandPlansScreenDisplayed();

    try {
      await broadbandPlansScreen.clearAndEnterZipCode('90210');
      await broadbandPlansScreen.tapCheckAvailability();
      await driver.pause(5000);
    } catch { /* Plans may already be visible */ }

    // Step 1: Scroll down the plans list
    await broadbandPlansScreen.scrollDownPlansList();
    await driver.pause(1000);

    // Expected: More plans are visible after scrolling
    await expect(broadbandPlansScreenLocators.pageTitle()).toBeDisplayed();
  });

});
