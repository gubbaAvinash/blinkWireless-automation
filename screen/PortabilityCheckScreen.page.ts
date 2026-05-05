import { numberPortabilityScreen, numberPortabilityLocators } from './NumberPortabilityScreen.page';

class PortabilityCheckScreen {
  async navigateToPortabilityCheck() {
    await numberPortabilityScreen.navigateToNumberPortability();
  }

  async verifyPortabilityCheckScreenDisplayed() {
    await numberPortabilityScreen.verifyNumberPortabilityScreenDisplayed();
  }
}

const portabilitycheckscreenScreen = new PortabilityCheckScreen();
const portabilitycheckscreenScreenLocators = numberPortabilityLocators;

export { portabilitycheckscreenScreen, portabilitycheckscreenScreenLocators };
