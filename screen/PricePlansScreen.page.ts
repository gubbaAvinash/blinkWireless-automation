import { homeScreen } from "./HomeScreen.page";

const pricePlansScreenLocators = {
  pageTitle:          () => $('//android.widget.TextView[@resource-id="mobile_navbar1_title"]'),
  backButton:         () => $('//android.view.ViewGroup[@resource-id="mobile_navbar1_backBtn"]'),
  plansList:          () => $('//android.view.ViewGroup[@resource-id="listPricePlans_list"]'),
  firstPlanItem:      () => $('(//android.view.ViewGroup[contains(@resource-id,"listPricePlans_listitem")])[1]'),
  planName:           () => $('(//android.widget.TextView[contains(@resource-id,"planName")])[1]'),
  planPrice:          () => $('(//android.widget.TextView[contains(@resource-id,"planPrice")])[1]'),
  planFeatures:       () => $('(//android.widget.TextView[contains(@resource-id,"planFeatures")])[1]'),
  selectPlanButton:   () => $('(//android.widget.TextView[contains(@resource-id,"selectPlan") or contains(@resource-id,"btnSelectPlan")])[1]'),
  categoryFilter:     () => $('//android.view.ViewGroup[@resource-id="categoryFilter_a"]'),
  monthlyTab:         () => $('//android.widget.TextView[@resource-id="tabMonthly_caption"]'),
  annualTab:          () => $('//android.widget.TextView[@resource-id="tabAnnual_caption"]'),
};

class PricePlansScreen {
  async navigateToPricePlans() {
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    // Price Plans accessible via Shop Phone → select a phone → Buy Now
    await homeScreen.tapShopPhoneButton();
    await pricePlansScreenLocators.pageTitle().waitForDisplayed({ timeout: 15000 });
  }

  async verifyPricePlansScreenDisplayed() {
    await pricePlansScreenLocators.pageTitle().waitForDisplayed({ timeout: 15000 });
    await driver.waitUntil(
      async () =>
        (await pricePlansScreenLocators.plansList().isDisplayed().catch(() => false)) ||
        (await pricePlansScreenLocators.firstPlanItem().isDisplayed().catch(() => false)),
      { timeout: 15000, interval: 500, timeoutMsg: 'Price plans list did not load' },
    );
  }

  async tapFirstPlan() {
    await pricePlansScreenLocators.firstPlanItem().waitForDisplayed({ timeout: 10000 });
    await pricePlansScreenLocators.firstPlanItem().click();
  }

  async tapSelectPlanButton() {
    await pricePlansScreenLocators.selectPlanButton().waitForDisplayed();
    await pricePlansScreenLocators.selectPlanButton().click();
  }

  async tapCategoryFilter() {
    await pricePlansScreenLocators.categoryFilter().waitForDisplayed();
    await pricePlansScreenLocators.categoryFilter().click();
  }

  async tapMonthlyTab() {
    await pricePlansScreenLocators.monthlyTab().waitForDisplayed();
    await pricePlansScreenLocators.monthlyTab().click();
  }

  async tapAnnualTab() {
    await pricePlansScreenLocators.annualTab().waitForDisplayed();
    await pricePlansScreenLocators.annualTab().click();
  }

  async tapBackButton() {
    await pricePlansScreenLocators.backButton().waitForDisplayed();
    await pricePlansScreenLocators.backButton().click();
  }

  async scrollDownPlansList() {
    await driver.execute('mobile: scrollGesture', {
      left: 100, top: 300, width: 300, height: 600,
      direction: 'down',
      percent: 2.0,
    });
  }

  async verifyPlanListVisible() {
    await driver.waitUntil(
      async () => (await pricePlansScreenLocators.firstPlanItem().isDisplayed().catch(() => false)),
      { timeout: 10000, interval: 500, timeoutMsg: 'No plan items visible' },
    );
  }
}

const pricePlansScreen = new PricePlansScreen();

export { pricePlansScreen, pricePlansScreenLocators };
