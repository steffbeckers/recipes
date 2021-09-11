import { Environment } from '@abp/ng.core';

const baseUrl = "https://{0}.recipes.steffbeckers.eu";

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'Recipes',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: baseUrl,
    redirectUri: baseUrl,
    clientId: 'Recipes_App',
    responseType: 'code',
    scope: 'offline_access Recipes',
    requireHttps: true
  },
  apis: {
    default: {
      url: baseUrl,
      rootNamespace: 'Recipes',
    },
  },
} as Environment;
