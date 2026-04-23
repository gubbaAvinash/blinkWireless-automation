import { homeScreen } from "./HomeScreen.page";

const broadbandPlansScreenLocators = {
  pageTitle:          () => $('//android.widget.TextView[@resource-id="mobile_navbar1_title"]'),
  backButton:         () => $('//android.view.ViewGroup[@resource-id="mobile_navbar1_backBtn"]'),
  plansList:          () => $('//android.view.ViewGroup[@resource-id="listBroadbandPlans_list"]'),
  firstPlanItem:      () => $('(//android.view.ViewGroup[contains(@resource-id,"listBroadbandPlans_listitem")])[1]'),
  planName:           () => $('(//android.widget.TextView[contains(@resource-id,"broadbandPlanName")])[1]'),
  planPrice:          () => $('(//android.widget.TextView[contains(@resource-id,"broadbandPlanPrice")])[1]'),
  planDescription:    () => $('(//android.widget.TextView[contains(@resource-id,"broadbandPlanDescription")])[1]'),
  selectPlanButton:   () => $('(//android.widget.TextView[contains(@resource-id,"selectBroadbandPlan") or contains(@resource-id,"btnSelectPlan")])[1]'),
  zipCodeInput:       () => $('//android.widget.EditText[@resource-id="serviceZipCode_i"]'),
  checkAvailability:  () => $('//android.widget.TextView[@resource-id="btnCheckAvailability_caption"]'),
  featuresSection:    () => $('//android.view.ViewGroup[@resource-id="containerFeatures_a"]'),
};

class BroadbandPlansScreen {
  async navigateToBroadbandPlans() {
    await homeScreen.launchApp();
    await homeScreen.verifyHomeScreenDisplayed();
    await homeScreen.tapBroadbandSection();
    await broadbandPlansScreenLocators.pageTitle().waitForDisplayed({ timeout: 15000 });
  }

  async verifyBroadbandPlansScreenDisplayed() {
    await broadbandPlansScreenLocators.pageTitle().waitForDisplayed({ timeout: 15000 });
    await driver.waitUntil(
      async () =>
        (await broadbandPlansScreenLocators.plansList().isDisplayed().catch(() => false)) ||
        (await broadbandPlansScreenLocators.firstPlanItem().isDisplayed().catch(() => false)) ||
        (await broadbandPlansScreenLocators.zipCodeInput().isDisplayed().catch(() => false)),
      { timeout: 15000, interval: 500, timeoutMsg: 'Broadband plans screen did not load' },
    );
  }

  async clearAndEnterZipCode(zipCode: string) {
    await broadbandPlansScreenLocators.zipCodeInput().waitForDisplayed({ timeout: 8000 });
    await broadbandPlansScreenLocators.zipCodeInput().click();
    await broadbandPlansScreenLocators.zipCodeInput().clearValue();
    await broadbandPlansScreenLocators.zipCodeInput().setValue(zipCode);
  }

  async tapCheckAvailability() {
    await broadbandPlansScreenLocators.checkAvailability().waitForDisplayed();
    await broadbandPlansScreenLocators.checkAvailability().click();
  }

  async tapFirstPlan() {
    await broadbandPlansScreenLocators.firstPlanItem().waitForDisplayed({ timeout: 10000 });
    await broadbandPlansScreenLocators.firstPlanItem().click();
  }

  async tapSelectPlanButton() {
    await broadbandPlansScreenLocators.selectPlanButton().waitForDisplayed();
    await broadbandPlansScreenLocators.selectPlanButton().click();
  }

  async tapBackButton() {
    await broadbandPlansScreenLocators.backButton().waitForDisplayed();
    await broadbandPlansScreenLocators.backButton().click();
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
      async () => (await broadbandPlansScreenLocators.firstPlanItem().isDisplayed().catch(() => false)),
      { timeout: 10000, interval: 500, timeoutMsg: 'No broadband plan items visible' },
    );
  }

  async verifyZipCodeDisplayed(expected: string) {
    await expect(broadbandPlansScreenLocators.zipCodeInput()).toHaveValue(expected);
  }
}

const broadbandPlansScreen = new BroadbandPlansScreen();

export { broadbandPlansScreen, broadbandPlansScreenLocators };
