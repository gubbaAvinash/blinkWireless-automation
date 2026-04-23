## BlinkWireless Mobile Automation

End-to-end mobile UI tests for the **BlinkWireless** Android app using **WebdriverIO v9**, **Mocha**, **TypeScript**, and **Appium**.  
The suite covers home navigation, permissions, portability check, and porting eligibility flows.

---

### Project Structure

- **`screen/`**  
  Page Object Model (POM) classes for each screen:
  - `HomeScreen.page.ts`
  - `PermissionScreen.page.ts`
  - `PortabilityCheckScreen.page.ts`
  - `PortingEligibilityScreen.page.ts`

- **`specs/`**  
  Mocha test specs:
  - `HomeScreen.spec.ts`
  - `PermissionScreen.spec.ts`
  - `PortabilityCheckScreen.spec.ts`
  - `PortingEligibilityScreen.spec.ts`

- **`wdio.conf.js`**  
  Local WebdriverIO + Appium configuration targeting a local Android device or emulator.

- **`wdio.browserstack.conf.js`**  
  WebdriverIO configuration for running the same specs on **BrowserStack App Automate**.

- **`apps/`**  
  Expected location for the `BlinkWireless.apk` used in local runs (see `wdio.conf.js`).

---

### Prerequisites

- **Node.js** 18+ installed
- **npm** (comes with Node)
- For **local Appium runs**:
  - Android SDK / emulator or a real Android device configured and visible via `adb devices`
  - Java installed (for Android tooling)
  - Appium (installed as a dev dependency; WebdriverIO starts it via `@wdio/appium-service`)
- For **BrowserStack runs**:
  - BrowserStack App Automate account
  - App uploaded to BrowserStack (you receive an app id like `bs://<hashed-id>`)

---

### Install Dependencies

From the project root:

```bash
cd blinkWireless-automation
npm install
```

This installs WebdriverIO, the Appium service, BrowserStack service, TypeScript, and related tooling.

---

### NPM Scripts and Commands

Most `test*` scripts follow the same pattern: **`report:clean`** → run **WebdriverIO** (with the right config and filters) → **`report:generate`** so `allure-report/` is refreshed. The process exit code reflects the test run (the report is still generated if tests fail).

To open the HTML report in a local server (avoids `file://` quirks), use **`npm run report:open`**.

#### TypeScript

| Script | What it does |
|--------|----------------|
| **`npm run build`** | Runs `tsc --noEmit`: type-checks the project without writing JS output. |
| **`npm run type-check`** | Same as `build` (`tsc --noEmit`). |

#### Full suite and filtered runs

| Script | What it does |
|--------|----------------|
| **`npm test`** | Local: cleans Allure dirs, runs all specs (`./specs/**/*.spec.ts`), then generates the Allure HTML report. |
| **`npm run test:bs`** | Same as `npm test` but uses **`wdio.browserstack.conf.js`** (requires env vars; see below). |
| **`npm run test:regression`** | Local: same pipeline as `npm test`, but only tests whose titles match Mocha grep **`@regression`**. |
| **`npm run test:regression:bs`** | BrowserStack variant of `test:regression`. |

#### Single-spec runs

Each pair runs **`specs/<File>.spec.ts`** only. The **`:bs`** script uses BrowserStack; the base script uses **`wdio.conf.js`** (local Appium + device or emulator).

| Script | Spec file |
|--------|-----------|
| **`npm run test:permission`** / **`test:permission:bs`** | `PermissionScreen.spec.ts` |
| **`npm run test:home`** / **`test:home:bs`** | `HomeScreen.spec.ts` |
| **`npm run test:portability`** / **`test:portability:bs`** | `PortabilityCheckScreen.spec.ts` |
| **`npm run test:porting-eligibility`** / **`test:porting-eligibility:bs`** | `PortingEligibilityScreen.spec.ts` |

#### Allure reporting utilities

| Script | What it does |
|--------|----------------|
| **`npm run report:clean`** | Deletes **`allure-results/`** and **`allure-report/`**. |
| **`npm run report:generate`** | Runs `npx allure generate allure-results --clean -o allure-report`. |
| **`npm run report:open`** | Opens the generated report in the Allure UI (local server). |

**Run a single test by title or pattern** — append Mocha options after `--`:

```bash
npm test -- --mochaOpts.grep="<substring or @tag>"
npm run test:bs -- --mochaOpts.grep="<substring or @tag>"
```

**Run a single spec file with a custom config**:

```bash
npx wdio run wdio.conf.js --spec specs/HomeScreen.spec.ts
npx wdio run wdio.browserstack.conf.js --spec specs/PermissionScreen.spec.ts
```

---

### Running Tests Locally (Appium + Android device or emulator)

1. **Ensure an Android device or emulator is available**

   ```bash
   adb devices
   ```

2. **Place the app under test**

   - Copy your BlinkWireless APK to **`apps/BlinkWireless.apk`**, or set **`APPIUM_APP`** in `.env` to a relative or absolute path.

3. **Run the local test suite**

   ```bash
   npm test
   ```

---

### Running Tests on BrowserStack

1. Upload the BlinkWireless APK to BrowserStack and note the **`bs://`** app id.

2. **Set environment variables** (in `.env` or your shell):

   - **`BROWSERSTACK_USERNAME`**, **`BROWSERSTACK_ACCESS_KEY`**, **`BROWSERSTACK_APP_ID`** (required)
   - Optional: **`BROWSERSTACK_DEVICE_NAME`**, **`BROWSERSTACK_PLATFORM_VERSION`**, **`BROWSERSTACK_PROJECT`**, **`BROWSERSTACK_BUILD`**, **`BROWSERSTACK_SESSION`**, **`BROWSERSTACK_BUILD_ID`**

3. **Run**:

   ```bash
   npm run test:bs
   ```

Copy **`.env.example`** to **`.env`** and fill in your values. **`.env`** is gitignored.

---

### Troubleshooting

- **`wdio: command not found`** — Run **`npm install`** and use **`npx wdio`** or npm scripts.
- **Local device or app issues** — Confirm **`adb devices`** lists your device and the APK path in **`wdio.conf.js`** / **`APPIUM_APP`** is valid.
- **BrowserStack auth or app issues** — Verify username, access key, and app id; confirm the uploaded app is still valid.

---

### Extending the Suite

- Add page objects under **`screen/`** and specs under **`specs/`**.  
- Both are included by **`tsconfig.json`** and picked up by **`wdio.conf.js`** (`./specs/**/*.spec.ts`).
