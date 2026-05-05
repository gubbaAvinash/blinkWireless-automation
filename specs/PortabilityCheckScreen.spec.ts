import { portabilitycheckscreenScreen } from '../screen/PortabilityCheckScreen.page';

describe('Portability Check Screen Tests', () => {
  it('TC130: Navigate to portability check and verify screen is displayed', async () => {
    await portabilitycheckscreenScreen.navigateToPortabilityCheck();
    await portabilitycheckscreenScreen.verifyPortabilityCheckScreenDisplayed();
  });
});
