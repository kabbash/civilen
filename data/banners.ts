import { client } from "@/sanity/lib/client";
import { bannersQuery, allBannersQuery } from "@/sanity/lib/queries";
import type { Banner } from "@/types";

// Revalidation time in seconds (5 minutes for banners - more dynamic content)
const REVALIDATE_TIME = 300;

/**
 * Fetch all active banners with revalidation
 * Only returns banners that are:
 * - Active (isActive = true)
 * - Within their date range (if startDate/endDate are set)
 */
export async function getActiveBanners(): Promise<Banner[]> {
  return await client.fetch(
    bannersQuery,
    {},
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );
}

/**
 * Fetch all banners (including inactive) for admin purposes
 */
export async function getAllBanners(): Promise<Banner[]> {
  return await client.fetch(
    allBannersQuery,
    {},
    {
      next: { revalidate: REVALIDATE_TIME },
    }
  );
}

