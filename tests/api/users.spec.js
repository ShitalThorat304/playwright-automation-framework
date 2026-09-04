const { test, expect } = require('@playwright/test');
const { createAuthenticatedApi } = require('../../utils/apiClient');

test('Get protected resource', async ({ request }) => {

  const api = await createAuthenticatedApi(request);

  const response = await api.get(
    '/api/auth/v1/oauth/protected-resource'
  );

  console.log('API status:', response.status());

  expect(response.status()).toBe(200);
});