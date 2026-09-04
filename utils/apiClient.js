const { getAccessToken } = require('./auth');

async function createAuthenticatedApi(request) {

  const accessToken = await getAccessToken(request);

  return {
    get: (url) =>
      request.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }),

    post: (url, data) =>
      request.post(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        data
      })
  };
}

module.exports = { createAuthenticatedApi };