export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '5005234f-68f1-4263-b800-7000a022311e',
      authority:
        'https://login.microsoftonline.com/c1681d21-0518-4e92-9131-696bc57a0d76/',
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};
