const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const DEFAULT_APK = path.join(process.cwd(), 'apps', 'BlinkWireless.apk');
const DEFAULT_APP_PACKAGE = 'com.wavemaker.turbomobiles';
const DEFAULT_APP_ACTIVITY = 'com.wavemaker.turbomobiles.MainActivity';

function resolveAppiumAppPath() {
    const fromEnv = process.env.APPIUM_APP;
    if (!fromEnv) {
        return DEFAULT_APK;
    }
    return path.isAbsolute(fromEnv) ? fromEnv : path.join(process.cwd(), fromEnv);
}

function buildLocalAndroidCapability() {
    const appPath = resolveAppiumAppPath();
    const base = {
        platformName: 'Android',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Pixel 9',
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '16.0',
        'appium:automationName': 'UiAutomator2',
        'appium:autoAcceptAlerts': true,
        'appium:newCommandTimeout': 240,
    };

    if (process.env.APPIUM_APP && !fs.existsSync(appPath)) {
        throw new Error(
            `[wdio] APPIUM_APP points to a missing file: ${appPath}\n` +
                'Fix the path or unset APPIUM_APP to use the default apps/BlinkWireless.apk or a pre-installed app.',
        );
    }

    if (fs.existsSync(appPath)) {
        return { ...base, 'appium:app': appPath };
    }

    const appPackage = process.env.ANDROID_APP_PACKAGE || DEFAULT_APP_PACKAGE;
    const appActivity = process.env.ANDROID_APP_ACTIVITY || DEFAULT_APP_ACTIVITY;

    console.warn(
        `[wdio] No APK at ${appPath}. Starting session with pre-installed app ` +
            `${appPackage} / ${appActivity}. Place BlinkWireless.apk in apps/ or set APPIUM_APP to install from disk.`,
    );

    return {
        ...base,
        'appium:appPackage': appPackage,
        'appium:appActivity': appActivity,
        'appium:noReset': true,
    };
}

exports.config = {
    runner: 'local',
    specs: ['./specs/**/*.spec.ts'],
    maxInstances: 1,
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],
    capabilities: [buildLocalAndroidCapability()],
    logLevel: 'info',
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000,
    },
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: path.join(__dirname, 'tsconfig.json'),
        },
    },
    services: ['appium'],
    appium: {
        command: 'appium',
        logLevel: 'warn',
    },
};
