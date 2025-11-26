import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// This endpoint handles on-demand revalidation for Sanity content
// It can be called via webhook when content is published/updated
export async function POST(request: NextRequest) {
  try {
    // Verify the request is authorized
    const secret = request.headers.get("x-sanity-revalidate-secret");

    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Revalidation secret not configured" }, { status: 500 });
    }

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { _type, slug, _id } = body;

    console.log(`[Revalidate] Received revalidation request for ${_type}:`, slug || _id);

    const revalidatedPaths: string[] = [];

    // Revalidate based on content type
    switch (_type) {
      case "article":
        // Revalidate the articles list page
        revalidatePath("/articles");
        revalidatedPaths.push("/articles");

        // Revalidate the specific article page if slug exists
        if (slug?.current || slug) {
          const slugString = slug?.current || slug;
          revalidatePath(`/articles/${slugString}`);
          revalidatedPaths.push(`/articles/${slugString}`);
        }

        // Revalidate homepage (if it shows articles)
        revalidatePath("/");
        revalidatedPaths.push("/");
        break;

      case "book":
        // Revalidate the books list page
        revalidatePath("/books");
        revalidatedPaths.push("/books");

        // Revalidate the specific book page if slug exists
        if (slug?.current || slug) {
          const slugString = slug?.current || slug;
          revalidatePath(`/books/${slugString}`);
          revalidatedPaths.push(`/books/${slugString}`);
        }

        // Revalidate homepage (if it shows books)
        revalidatePath("/");
        revalidatedPaths.push("/");
        break;

      case "errata":
        // Revalidate the errata page
        revalidatePath("/errata");
        revalidatedPaths.push("/errata");
        break;

      default:
        // For unknown types, revalidate homepage
        revalidatePath("/");
        revalidatedPaths.push("/");
    }

    console.log(`[Revalidate] Successfully revalidated paths:`, revalidatedPaths);

    return NextResponse.json(
      {
        success: true,
        message: "Revalidation successful",
        revalidated: {
          paths: revalidatedPaths,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Revalidate] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to revalidate",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to verify the revalidate API is working
export async function GET() {
  return NextResponse.json({
    message: "Revalidate API is active",
    endpoint: "/api/revalidate",
    version: "1.0",
    configured: !!process.env.SANITY_REVALIDATE_SECRET,
  });
}
