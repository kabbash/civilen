/**
 * Newsletter System Test Script
 *
 * This script helps you test the newsletter functionality locally.
 *
 * Usage:
 * 1. Start your dev server: npm run dev
 * 2. Run this script: npx ts-node scripts/test-newsletter.ts
 */

const BASE_URL = "http://localhost:3000";

async function testSubscription(email: string) {
  console.log("\n🔍 Testing subscription...");
  console.log(`Email: ${email}`);

  try {
    const response = await fetch(`${BASE_URL}/api/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, source: "test" }),
    });

    const data = await response.json();
    console.log(`Status: ${response.status}`);
    console.log("Response:", data);

    if (response.ok) {
      console.log("✅ Subscription successful!");
    } else {
      console.log("❌ Subscription failed");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

async function testWebhook() {
  console.log("\n🔍 Testing webhook...");

  try {
    const response = await fetch(`${BASE_URL}/api/webhook/notify-subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If you have SANITY_WEBHOOK_SECRET set, uncomment and add it:
        // 'x-sanity-webhook-secret': 'your_secret_here',
      },
      body: JSON.stringify({
        _type: "article",
        title: "Test Article",
        slug: "test-article",
        description: "This is a test article to verify the newsletter system works.",
      }),
    });

    const data = await response.json();
    console.log(`Status: ${response.status}`);
    console.log("Response:", data);

    if (response.ok) {
      console.log("✅ Webhook test successful!");
      console.log(`📧 Would send emails to ${data.subscriberCount} subscribers`);
      console.log(`📄 Notification saved to: ${data.notificationFile}`);
    } else {
      console.log("❌ Webhook test failed");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

async function checkWebhookStatus() {
  console.log("\n🔍 Checking webhook status...");

  try {
    const response = await fetch(`${BASE_URL}/api/webhook/notify-subscribers`);
    const data = await response.json();
    console.log("Response:", data);

    if (response.ok) {
      console.log("✅ Webhook is active!");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// Run tests
async function runTests() {
  console.log("📧 Newsletter System Test Suite");
  console.log("================================\n");

  // Check webhook status
  await checkWebhookStatus();

  // Test subscription with a sample email
  await testSubscription("test@example.com");

  // Test webhook notification
  await testWebhook();

  console.log("\n✨ Test suite complete!");
  console.log("\nNext steps:");
  console.log("1. Check Sanity Studio for the new subscriber");
  console.log("2. Check the /notifications folder for the notification file");
  console.log("3. Check console logs for email sending status");
}

// Run if executed directly
if (require.main === module) {
  runTests();
}

export { testSubscription, testWebhook, checkWebhookStatus };

