// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.//
export const environment = {
    production: false,
    appInsights: {
        instrumentationKey: '64465e14-ac2a-465a-9b69-2ca5e19e0af8'// '64464274-6ea4-4d9f-b319-a151de61e316'
    },
    apiBaseUrl: 'https://junoservices.azurewebsites.net/',
    serverUrl: 'junoservices.azurewebsites.net',
    environment:'Development',
    version: new Date().getTime(),
    tenant: 'WalshQAAuth',
    tenantId: '1a862db4-06d6-4298-8474-60718e0a8dd3',
    policy: 'B2C_1_WalshQAAppAuth',
    policyReset: 'B2C_1_WalshQAReset',
    clientId: '9914c9fc-d87f-4450-be0a-b9a0a65311b9',
    // Legacy app URLs for cross-domain navigation
    legacyAppConfig: {
        baseUrl: 'https://junoqa.azurewebsites.net' // QA/Development legacy app URL
    }
};

