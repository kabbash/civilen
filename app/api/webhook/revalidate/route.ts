import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Webhook endpoint for automatic revalidation when Sanity content is published/updated
// Configure this URL in Sanity webhooks: https://www.sanity.io/manage
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity using HTTP header
    const secret = request.headers.get("x-sanity-webhook-secret");
    const envSecret = process.env.SANITY_WEBHOOK_SECRET;

    console.log("[Webhook Revalidate] Received request");

    if (!envSecret) {
      console.error("[Webhook Revalidate] SANITY_WEBHOOK_SECRET not configured");
      return NextResponse.json(
        { message: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    if (!secret) {
      console.error("[Webhook Revalidate] No secret header provided");
      return NextResponse.json(
        { message: "Unauthorized - Missing x-sanity-webhook-secret header" },
        { status: 401 }
      );
    }

    // Trim whitespace and compare
    if (secret.trim() !== envSecret.trim()) {
      console.error("[Webhook Revalidate] Secret mismatch");
      return NextResponse.json(
        { message: "Unauthorized - Invalid secret" },
        { status: 401 }
      );
    }

    // Parse the webhook body
    const body = await request.json();
    const { _type, slug } = body;

    if (!_type) {
      console.error("[Webhook Revalidate] Missing _type in body");
      return NextResponse.json(
        { message: "Bad Request - Missing document type" },
        { status: 400 }
      );
    }

    console.log(`[Webhook Revalidate] Processing ${_type}:`, slug?.current || slug || "no-slug");

    const revalidatedPaths: string[] = [];

    // Revalidate based on content type
    switch (_type) {
      case "article":
        revalidatePath("/articles");
        revalidatedPaths.push("/articles");

        if (slug?.current || slug) {
          const slugString = slug?.current || slug;
          revalidatePath(`/articles/${slugString}`);
          revalidatedPaths.push(`/articles/${slugString}`);
        }

        revalidatePath("/");
        revalidatedPaths.push("/");
        break;

      case "book":
        revalidatePath("/books");
        revalidatedPaths.push("/books");

        if (slug?.current || slug) {
          const slugString = slug?.current || slug;
          revalidatePath(`/books/${slugString}`);
          revalidatedPaths.push(`/books/${slugString}`);
        }

        revalidatePath("/");
        revalidatedPaths.push("/");
        break;

      case "errata":
        revalidatePath("/errata");
        revalidatedPaths.push("/errata");
        break;

      default:
        revalidatePath("/");
        revalidatedPaths.push("/");
    }

    console.log(`[Webhook Revalidate] Revalidated paths:`, revalidatedPaths);

    return NextResponse.json(
      {
        success: true,
        message: "Webhook revalidation successful",
        revalidated: {
          paths: revalidatedPaths,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Webhook Revalidate] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process webhook",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to verify the webhook is working
export async function GET() {
  return NextResponse.json({
    message: "Webhook revalidate API is active",
    endpoint: "/api/webhook/revalidate",
    version: "1.0",
    configured: !!process.env.SANITY_WEBHOOK_SECRET,
  });
}
