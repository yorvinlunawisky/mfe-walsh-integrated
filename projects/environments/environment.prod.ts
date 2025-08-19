export const environment = {
    production: true,
    appInsights: {
        instrumentationKey: '64465e14-ac2a-465a-9b69-2ca5e19e0af8'
    },
    apiBaseUrl: 'https://walshservices.com/', // Production API
    serverUrl: 'walshservices.com',
    environment:'Production',
    version: new Date().getTime(),
    tenant: 'WalshProdAuth',
    tenantId: '1a862db4-06d6-4298-8474-60718e0a8dd3', // Update with prod tenant ID
    policy: 'B2C_1_WalshProdAppAuth',
    policyReset: 'B2C_1_WalshProdReset',
    clientId: '9914c9fc-d87f-4450-be0a-b9a0a65311b9',
    // Legacy app URLs for cross-domain navigation
    legacyAppConfig: {
        baseUrl: 'https://walshqa.com' // Production legacy app URL
    }
};