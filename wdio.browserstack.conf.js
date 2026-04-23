const { config: localConfig } = require('./wdio.conf');

exports.config = {
    ...localConfig,

    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    services: [
        [
            'browserstack',
            {
                app: process.env.BROWSERSTACK_APP_ID,
                buildIdentifier: process.env.BROWSERSTACK_BUILD_ID,
            },
        ],
    ],

    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:autoAcceptAlerts': true,
            'appium:deviceName': process.env.BROWSERSTACK_DEVICE_NAME || 'Google Pixel 7',
            'appium:platformVersion': process.env.BROWSERSTACK_PLATFORM_VERSION || '13.0',
            'appium:app': process.env.BROWSERSTACK_APP_ID,
            'bstack:options': {
                projectName: process.env.BROWSERSTACK_PROJECT || 'BlinkWireless Mobile Automation',
                buildName: process.env.BROWSERSTACK_BUILD || 'BlinkWireless Android Regression',
                sessionName: process.env.BROWSERSTACK_SESSION || 'BlinkWireless E2E',
                debug: true,
                networkLogs: true,
            },
        },
    ],

    appium: undefined,
};
