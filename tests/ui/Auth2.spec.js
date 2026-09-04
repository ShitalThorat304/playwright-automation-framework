// reqres.in has a free login API — no signup needed
// POST https://reqres.in/api/login
const {test, expect}=require('@playwright/test');
test('Login and get token', async ({ request }) => {

  // Step 1 — Get token from free test API
  const tokenResponse = await request.post('https://reqres.in/api/login', {
    data: {
      email:    "eve.holt@reqres.in",  // built-in test user
      password: "cityslicka"           // built-in test password
    }
  });

  expect(tokenResponse.status()).toBe(200);
  const body = await tokenResponse.json();
  const token = body.token; // reqres returns a token

  console.log("Token received:", token);

  // Step 2 — Use token in next request
  const response = await request.get('https://reqres.in/api/users/1', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  expect(response.status()).toBe(200);

});

// Test no credentials — should fail
test('Login with wrong credentials returns 400', async ({ request }) => {

  const response = await request.post('https://reqres.in/api/login', {
    data: {
      email:    "wrong@email.com",
      password: "wrongpassword"
    }
  });

  expect(response.status()).toBe(400); // bad request
  const body = await response.json();
  expect(body.error).toBeDefined();

});