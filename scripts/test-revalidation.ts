/**
 * Test script for revalidation endpoints
 * Run with: npx tsx scripts/test-revalidation.ts
 */

async function testRevalidationEndpoints() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
  const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;

  console.log('🧪 Testing Revalidation Endpoints\n');
  console.log(`Base URL: ${baseUrl}\n`);

  // Test 1: Check if manual revalidate endpoint is active
  console.log('1️⃣ Testing manual revalidate endpoint (GET)...');
  try {
    const response = await fetch(`${baseUrl}/api/revalidate`);
    const data = await response.json();
    console.log('✅ Manual revalidate endpoint is active:', data);
  } catch (error) {
    console.error('❌ Failed to reach manual revalidate endpoint:', error);
  }
  console.log('');

  // Test 2: Check if webhook revalidate endpoint is active
  console.log('2️⃣ Testing webhook revalidate endpoint (GET)...');
  try {
    const response = await fetch(`${baseUrl}/api/webhook/revalidate`);
    const data = await response.json();
    console.log('✅ Webhook revalidate endpoint is active:', data);
  } catch (error) {
    console.error('❌ Failed to reach webhook revalidate endpoint:', error);
  }
  console.log('');

  // Test 3: Test manual revalidation with secret
  if (revalidateSecret) {
    console.log('3️⃣ Testing manual revalidation (POST with secret)...');
    try {
      const response = await fetch(`${baseUrl}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-sanity-revalidate-secret': revalidateSecret,
        },
        body: JSON.stringify({
          _type: 'article',
          _id: 'test-id',
          slug: 'test-article',
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('✅ Manual revalidation successful:', data);
      } else {
        console.error('❌ Manual revalidation failed:', data);
      }
    } catch (error) {
      console.error('❌ Error during manual revalidation:', error);
    }
  } else {
    console.log('3️⃣ ⚠️ Skipping manual revalidation test (SANITY_REVALIDATE_SECRET not set)');
  }
  console.log('');

  // Test 4: Test webhook revalidation with secret
  if (webhookSecret) {
    console.log('4️⃣ Testing webhook revalidation (POST with secret)...');
    try {
      const response = await fetch(`${baseUrl}/api/webhook/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-sanity-webhook-secret': webhookSecret,
        },
        body: JSON.stringify({
          _type: 'book',
          _id: 'test-book-id',
          slug: 'test-book',
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('✅ Webhook revalidation successful:', data);
      } else {
        console.error('❌ Webhook revalidation failed:', data);
      }
    } catch (error) {
      console.error('❌ Error during webhook revalidation:', error);
    }
  } else {
    console.log('4️⃣ ⚠️ Skipping webhook revalidation test (SANITY_WEBHOOK_SECRET not set)');
  }
  console.log('');

  // Test 5: Test unauthorized access (should fail)
  console.log('5️⃣ Testing unauthorized access (should fail)...');
  try {
    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-sanity-revalidate-secret': 'wrong-secret',
      },
      body: JSON.stringify({
        _type: 'article',
        slug: 'test',
      }),
    });
    const data = await response.json();
    if (response.status === 401) {
      console.log('✅ Correctly rejected unauthorized request');
    } else {
      console.error('❌ Should have rejected unauthorized request:', data);
    }
  } catch (error) {
    console.error('❌ Error during unauthorized access test:', error);
  }
  console.log('');

  console.log('✨ Testing complete!\n');
  console.log('📝 Next steps:');
  console.log('  1. Ensure environment variables are set in .env.local');
  console.log('  2. Test manual revalidation from Sanity Studio');
  console.log('  3. Configure webhooks in Sanity Manage');
  console.log('  4. Deploy to production and test there');
}

// Run the tests
testRevalidationEndpoints().catch(console.error);





