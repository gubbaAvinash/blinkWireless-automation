import { portabilityCheckScreen } from "./PortabilityCheckScreen.page";

/** Try common WaveMaker / Material patterns for inline field errors or snackbars. */
const PHONE_VALIDATION_ERROR_XPATHS = [
  '//android.widget.TextView[contains(@resource-id,"enterPhoneNumber") and contains(@resource-id,"error")]',
  '//android.widget.TextView[contains(@resource-id,"enterPhoneNumber") and contains(@resource-id,"Error")]',
  '//android.widget.TextView[contains(@resource-id,"PhoneNumber") and contains(@resource-id,"error")]',
  '//android.widget.TextView[contains(@resource-id,"phoneNumber") and contains(@resource-id,"error")]',
];

const SNACKBAR_TEXT =
  '//android.widget.TextView[contains(@resource-id,"snackbar_text") or contains(@resource-id,"snackbar")]';

const portingEligibilityLocators = {
  pageTitle: () => $('//android.view.View[@resource-id="mobile_navbar1_title"]'),
  instructionText: () => $('//android.widget.TextView[@resource-id="lblDetailsPortEligibilityCheck_caption"]'),
  phoneNumberLabel: () => $('//android.widget.TextView[@resource-id="enterPhoneNumber_formLabel_caption"]'),
  phoneNumberInput: () => $('//android.widget.EditText[@resource-id="enterPhoneNumber_i"]'),
  carrierDropdown: () => $('//android.view.ViewGroup[@resource-id="containerCarrrier_a"]'),
  carrierSelectedText: () => $('//android.widget.TextView[@resource-id="label6_caption"]'),
  accountNumberLabel: () => $('//android.widget.TextView[@resource-id="accountNumber_formLabel_caption"]'),
  accountNumberInput: () => $('//android.widget.EditText[@resource-id="accountNumber_i"]'),
  billStatementText: () => $('//android.widget.TextView[@resource-id="label5_caption"]'),
  checkPortingEligibilityButton: () => $('//android.widget.TextView[@resource-id="btnCheckEligibility_caption"]'),
};

const PORTING_ELIGIBILITY_LOAD_TIMEOUT_MS = 45000;

class PortingEligibilityScreen {
  /**
   * After tapping Check Eligibility on portability, the next screen may load slowly.
   * Wait for any strong signal: navbar title, porting phone field, or instruction line.
   */
  async waitForPortingEligibilityScreenLoaded(timeoutMs = PORTING_ELIGIBILITY_LOAD_TIMEOUT_MS) {
    const title = portingEligibilityLocators.pageTitle();
    const phone = portingEligibilityLocators.phoneNumberInput();
    const instruction = portingEligibilityLocators.instructionText();
    await driver.waitUntil(
      async () =>
        (await title.isDisplayed().catch(() => false)) ||
        (await phone.isDisplayed().catch(() => false)) ||
        (await instruction.isDisplayed().catch(() => false)),
      {
        timeout: timeoutMs,
        interval: 500,
        timeoutMsg:
          "Porting eligibility screen did not appear (no title, enterPhoneNumber field, or instruction text)",
      },
    );
  }

  /** Navbar may be a non-text container; read self or first TextView child. */
  async readNavbarTitleVisibleText(): Promise<string> {
    const root = portingEligibilityLocators.pageTitle();
    if (!(await root.isDisplayed().catch(() => false))) return "";
    let t = (await root.getText().catch(() => "")) || "";
    if (t.trim()) return t.trim();
    const inner = root.$("android.widget.TextView");
    if (await inner.isExisting().catch(() => false)) {
      t = (await inner.getText().catch(() => "")) || "";
    }
    return (t || "").trim();
  }

  /** Prefer matching navbar copy; if the bar has no text node, require instruction + phone field. */
  async assertPortingEligibilityScreenContext() {
    const nav = await this.readNavbarTitleVisibleText();
    if (nav) {
      await expect(nav).toBe("Porting Check Eligibility");
      return;
    }
    await expect(portingEligibilityLocators.instructionText()).toBeDisplayed();
    await expect(portingEligibilityLocators.phoneNumberInput()).toBeDisplayed();
  }

  async navigateToPortingEligibility() {
    await portabilityCheckScreen.navigateToPortabilityCheck();
    await portabilityCheckScreen.clearAndEnterMobileNumber('5551234567');
    await portabilityCheckScreen.clearAndEnterZipCode('90210');
    await portabilityCheckScreen.tapCheckEligibilityButton();
    await driver.pause(750);
    await this.waitForPortingEligibilityScreenLoaded();
  }

  async verifyPortingEligibilityScreenDisplayed() {
    await this.waitForPortingEligibilityScreenLoaded();
    await this.assertPortingEligibilityScreenContext();
  }

  async clearAndEnterPhoneNumber(phoneNumber) {
    await portingEligibilityLocators.phoneNumberInput().waitForDisplayed();
    await portingEligibilityLocators.phoneNumberInput().click();
    await portingEligibilityLocators.phoneNumberInput().clearValue();
    await portingEligibilityLocators.phoneNumberInput().setValue(phoneNumber);
  }

  async tapCarrierDropdown() {
    await portingEligibilityLocators.carrierDropdown().waitForDisplayed();
    await portingEligibilityLocators.carrierDropdown().click();
  }

  async selectCarrier(carrierName) {
    await this.tapCarrierDropdown();
    // Note: Carrier selection implementation would depend on dropdown structure
    await driver.pause(1000);
  }

  async clearAndEnterAccountNumber(accountNumber) {
    await portingEligibilityLocators.accountNumberInput().waitForDisplayed();
    await portingEligibilityLocators.accountNumberInput().click();
    await portingEligibilityLocators.accountNumberInput().clearValue();
    await portingEligibilityLocators.accountNumberInput().setValue(accountNumber);
  }

  async tapCheckPortingEligibilityButton() {
    await portingEligibilityLocators.checkPortingEligibilityButton().waitForDisplayed();
    await portingEligibilityLocators.checkPortingEligibilityButton().click();
  }

  async verifyPhoneNumberDisplayed(expectedNumber) {
    await expect(portingEligibilityLocators.phoneNumberInput()).toHaveValue(expectedNumber);
  }

  async verifyPhoneNumberFieldExpectedOutcome(expectedNumber: string) {
    await this.assertPortingEligibilityScreenContext();
    const input = portingEligibilityLocators.phoneNumberInput();
    await expect(input).toBeDisplayed();
    await expect(input).toBeEnabled();
    await expect(input).toHaveValue(expectedNumber);
  }

  async verifyAccountNumberDisplayed(expectedAccountNumber) {
    await expect(portingEligibilityLocators.accountNumberInput()).toHaveValue(expectedAccountNumber);
  }

  async verifyCarrierSelected(carrierName) {
    await expect(portingEligibilityLocators.carrierSelectedText()).toHaveText(carrierName);
  }

  async verifyCarrierSelectionExpectedOutcome(carrierName: string) {
    await this.assertPortingEligibilityScreenContext();
    await expect(portingEligibilityLocators.carrierDropdown()).toBeDisplayed();
    await this.verifyCarrierSelected(carrierName);
  }

  async verifyAccountNumberFieldExpectedOutcome(accountNumber: string) {
    await this.assertPortingEligibilityScreenContext();
    const input = portingEligibilityLocators.accountNumberInput();
    await expect(input).toBeDisplayed();
    await expect(input).toBeEnabled();
    await expect(input).toHaveValue(accountNumber);
  }

  async waitForPortingEligibilitySubmitToSettle(timeoutMs = 20000) {
    await driver.pause(500);
    const button = portingEligibilityLocators.checkPortingEligibilityButton();
    await driver.waitUntil(
      async () => (await button.getAttribute("clickable")) === "true",
      {
        timeout: timeoutMs,
        interval: 400,
        timeoutMsg: "Porting eligibility submit did not settle (button stayed non-clickable)",
      },
    );
  }

  async verifyPortingEligibilitySubmitExpectedOutcome() {
    await this.waitForPortingEligibilitySubmitToSettle();
    await this.assertPortingEligibilityScreenContext();
    await this.verifyPhoneNumberDisplayed("5551234567");
    await this.verifyCarrierSelected("T-Mobile");
    await this.verifyAccountNumberDisplayed("1234567890");
    await expect(portingEligibilityLocators.instructionText()).toBeDisplayed();
    const detail = (await portingEligibilityLocators.instructionText().getText()).trim();
    await expect(detail.length).toBeGreaterThan(0);
    await expect(portingEligibilityLocators.checkPortingEligibilityButton()).toBeDisplayed();
  }

  async verifyPhoneNumberRequiredValidationDisplayed() {
    const tryXpath = async (xpath: string, timeout: number) => {
      const el = $(xpath);
      await el.waitForDisplayed({ timeout });
      return el;
    };

    const assertPhoneStillEmpty = async () => {
      await expect(portingEligibilityLocators.phoneNumberInput()).toHaveValue("");
    };

    const assertStillOnPortingEligibility = async () => {
      await this.assertPortingEligibilityScreenContext();
    };

    let lastErr: unknown;
    for (const xp of PHONE_VALIDATION_ERROR_XPATHS) {
      try {
        const el = await tryXpath(xp, 3500);
        await expect(el).toBeDisplayed();
        await assertPhoneStillEmpty();
        await assertStillOnPortingEligibility();
        return;
      } catch (e) {
        lastErr = e;
      }
    }

    try {
      const snack = await tryXpath(SNACKBAR_TEXT, 8000);
      await expect(snack).toBeDisplayed();
      await assertPhoneStillEmpty();
      await assertStillOnPortingEligibility();
    } catch {
      throw lastErr instanceof Error
        ? lastErr
        : new Error("Expected validation or snackbar for missing phone number");
    }
  }

  async longPressPhoneNumberField() {
    const input = await portingEligibilityLocators.phoneNumberInput();
    await input.waitForDisplayed();
    await driver.touchAction([
      { action: 'longPress', element: input as unknown as WebdriverIO.Element },
      { action: 'release' },
    ]);
  }
}

const portingEligibilityScreen = new PortingEligibilityScreen();

export { portingEligibilityScreen, portingEligibilityLocators };