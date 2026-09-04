const { test, expect } = require('@playwright/test');
const { getAccessToken } = require('../../utils/auth');

test('Generate OAuth 2.0 access token', async ({ request }) => {

  const accessToken = await getAccessToken(request);

  console.log('OAuth token generated successfully');

  expect(accessToken).toBeTruthy();
});