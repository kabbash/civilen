import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Webhook endpoint for automatic revalidation when Sanity content is published/updated
// Configure this URL in Sanity webhooks: https://www.sanity.io/manage
export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(request, process.env.SANITY_WEBHOOK_SECRET);

    // Validate the signature if a secret is configured
    if (process.env.SANITY_WEBHOOK_SECRET && !isValidSignature) {
      const message = "Invalid signature";
      return new NextResponse(JSON.stringify({ message, isValidSignature, body }), { status: 401 });
    }

    if (!body?._type) {
      const message = "Bad Request: Missing document type";
      return new NextResponse(JSON.stringify({ message, body }), { status: 400 });
    }

    // Sanity webhook body structure: { _type, slug, _id, ... }
    const { _type, slug } = body;

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
