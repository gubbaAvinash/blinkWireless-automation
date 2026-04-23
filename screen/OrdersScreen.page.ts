const ordersScreenLocators = {
  pageTitle:        () => $('//android.widget.TextView[@resource-id="mobile_navbar1_title"]'),
  backButton:       () => $('//android.view.ViewGroup[@resource-id="mobile_navbar1_backBtn"]'),
  ordersList:       () => $('//android.view.ViewGroup[@resource-id="listOrders_list"]'),
  firstOrderItem:   () => $('(//android.view.ViewGroup[contains(@resource-id,"listOrders_listitem")])[1]'),
  orderIdText:      () => $('(//android.widget.TextView[contains(@resource-id,"orderId")])[1]'),
  orderStatusText:  () => $('(//android.widget.TextView[contains(@resource-id,"orderStatus")])[1]'),
  orderDateText:    () => $('(//android.widget.TextView[contains(@resource-id,"orderDate")])[1]'),
  emptyOrdersText:  () => $('//android.widget.TextView[contains(@resource-id,"emptyOrders") or contains(@text,"No orders")]'),
  filterButton:     () => $('//android.view.ViewGroup[@resource-id="filterOrdersBtn_a"]'),
  pendingTab:       () => $('//android.widget.TextView[@resource-id="tabPendingOrders_caption"]'),
  completedTab:     () => $('//android.widget.TextView[@resource-id="tabCompletedOrders_caption"]'),
};

class OrdersScreen {
  async waitForOrdersScreenLoaded(timeoutMs = 20000) {
    await driver.waitUntil(
      async () =>
        (await ordersScreenLocators.ordersList().isDisplayed().catch(() => false)) ||
        (await ordersScreenLocators.emptyOrdersText().isDisplayed().catch(() => false)) ||
        (await ordersScreenLocators.firstOrderItem().isDisplayed().catch(() => false)),
      { timeout: timeoutMs, interval: 500, timeoutMsg: 'Orders screen did not load' },
    );
  }

  async verifyOrdersScreenDisplayed() {
    await this.waitForOrdersScreenLoaded();
    await expect(ordersScreenLocators.pageTitle()).toBeDisplayed();
  }

  async tapFirstOrder() {
    await ordersScreenLocators.firstOrderItem().waitForDisplayed({ timeout: 10000 });
    await ordersScreenLocators.firstOrderItem().click();
  }

  async tapFilterButton() {
    await ordersScreenLocators.filterButton().waitForDisplayed();
    await ordersScreenLocators.filterButton().click();
  }

  async tapPendingTab() {
    await ordersScreenLocators.pendingTab().waitForDisplayed();
    await ordersScreenLocators.pendingTab().click();
  }

  async tapCompletedTab() {
    await ordersScreenLocators.completedTab().waitForDisplayed();
    await ordersScreenLocators.completedTab().click();
  }

  async tapBackButton() {
    await ordersScreenLocators.backButton().waitForDisplayed();
    await ordersScreenLocators.backButton().click();
  }

  async scrollDownOrdersList() {
    await driver.execute('mobile: scrollGesture', {
      left: 100, top: 300, width: 300, height: 600,
      direction: 'down',
      percent: 2.0,
    });
  }

  async verifyOrdersListVisible() {
    await driver.waitUntil(
      async () =>
        (await ordersScreenLocators.firstOrderItem().isDisplayed().catch(() => false)) ||
        (await ordersScreenLocators.emptyOrdersText().isDisplayed().catch(() => false)),
      { timeout: 10000, interval: 500, timeoutMsg: 'Orders list or empty state not visible' },
    );
  }
}

const ordersScreen = new OrdersScreen();

export { ordersScreen, ordersScreenLocators };
