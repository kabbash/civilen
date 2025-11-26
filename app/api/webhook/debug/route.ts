import { NextRequest, NextResponse } from "next/server";

// Debug endpoint to check webhook configuration
// Visit: https://your-domain.vercel.app/api/webhook/debug
export async function GET() {
  const envSecret = process.env.SANITY_WEBHOOK_SECRET;

  return NextResponse.json({
    message: "Webhook Debug Info",
    environment: {
      hasSecret: !!envSecret,
      secretLength: envSecret?.length || 0,
      secretPreview: envSecret
        ? `${envSecret.substring(0, 5)}...${envSecret.substring(envSecret.length - 5)}`
        : "NOT SET",
    },
    instructions: "Send a POST request with x-sanity-webhook-secret header to test",
  });
}

export async function POST(request: NextRequest) {
  const envSecret = process.env.SANITY_WEBHOOK_SECRET;
  const headerSecret = request.headers.get("x-sanity-webhook-secret");

  // Get all headers for debugging
  const allHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    if (key.toLowerCase().includes("sanity") || key.toLowerCase().includes("secret")) {
      allHeaders[key] = value ? `${value.substring(0, 5)}...` : "empty";
    }
  });

  return NextResponse.json({
    message: "Webhook Debug - POST Request",
    environment: {
      hasEnvSecret: !!envSecret,
      envSecretLength: envSecret?.length || 0,
      envSecretPreview: envSecret
        ? `${envSecret.substring(0, 5)}...${envSecret.substring(envSecret.length - 5)}`
        : "NOT SET",
    },
    request: {
      hasHeaderSecret: !!headerSecret,
      headerSecretLength: headerSecret?.length || 0,
      headerSecretPreview: headerSecret
        ? `${headerSecret.substring(0, 5)}...${headerSecret.substring(headerSecret.length - 5)}`
        : "NOT SENT",
      relevantHeaders: allHeaders,
    },
    validation: {
      secretsMatch: headerSecret === envSecret,
      lengthsMatch: headerSecret?.length === envSecret?.length,
      bothExist: !!headerSecret && !!envSecret,
    },
    tip: "If lengths don't match, check for extra whitespace in env var or header value",
  });
}
