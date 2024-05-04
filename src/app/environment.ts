import { Configuration } from '@azure/msal-browser';

export const environment = {
  production: false,
  apiConfig: {
    uri: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['user.read'],
  },
  WeatherApiConfig: {
    uri: 'https://localhost:7089/weatherforecast',
    scopes: ['api://c5825c41-1e96-43d8-a559-a141d6565e88/Weather.Read'],
  },
  SignalR: {
    uri: 'https://localhost:7089/hubs',
  },
};

export const msalConfig: Configuration = {
  auth: {
    clientId: '5005234f-68f1-4263-b800-7000a022311e',
    authority:
      'https://login.microsoftonline.com/c1681d21-0518-4e92-9131-696bc57a0d76/',
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
};
