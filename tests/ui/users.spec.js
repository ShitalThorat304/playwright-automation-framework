import { test, expect } from '@playwright/test';

test('GET single user', async ({ request }) => {

    const response = await request.get('/api/users/2', {
        headers: {
            'x-api-key': process.env.API_KEY
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeTruthy();

});