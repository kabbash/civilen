// Revalidation utility for triggering Next.js revalidation from Sanity Studio

interface RevalidatePayload {
  _type: string;
  _id: string;
  slug?: {
    current: string;
  };
  title?: string;
}

/**
 * Triggers Next.js revalidation for a specific document
 * This can be called from Sanity Studio document actions
 */
export async function revalidateDocument(payload: RevalidatePayload): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Get the revalidate URL - in production this should be your deployed URL
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    const revalidateUrl = `${baseUrl}/api/revalidate`;
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      console.error("[Revalidate] SANITY_REVALIDATE_SECRET is not configured");
      return {
        success: false,
        message: "Revalidate secret not configured",
      };
    }

    console.log(
      `[Revalidate] Triggering revalidation for ${payload._type}:`,
      payload.slug?.current || payload._id
    );

    const response = await fetch(revalidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sanity-revalidate-secret": secret,
      },
      body: JSON.stringify({
        _type: payload._type,
        _id: payload._id,
        slug: payload.slug?.current || payload.slug,
        title: payload.title,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Revalidate] Failed:", error);
      return {
        success: false,
        message: `Revalidation failed: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();
    console.log("[Revalidate] Success:", result);

    return {
      success: true,
      message: "Content revalidated successfully",
    };
  } catch (error) {
    console.error("[Revalidate] Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to revalidate",
    };
  }
}





