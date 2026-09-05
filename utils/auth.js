require('dotenv').config();
async function getAccessToken(request) {

  const response = await request.post(
    '/api/auth/v1/oauth/token',
    {
      data: {
        grantType: 'client_credentials',
        clientId: process.env.CLIENT_ID,
       clientSecret: process.env.CLIENT_SECRET
      }
    }
  );

  if (response.status() !== 200) {
    throw new Error(`Token request failed: ${response.status()}`);
  }

  const body = await response.json();

  if (!body.access_token) {
    throw new Error('Access token was not returned');
  }

  return body.access_token;
}

module.exports = { getAccessToken };