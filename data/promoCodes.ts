/**
 * Promo codes data layer
 */

import { client } from "@/sanity/lib/client";
import { promoCodeByNameQuery } from "@/sanity/lib/queries";
import { PromoCode } from "@/types";

/**
 * Get a promo code by its URL name/slug
 */
export async function getPromoCodeByName(name: string): Promise<PromoCode | null> {
  const promoCode = await client.fetch<PromoCode | null>(promoCodeByNameQuery, {
    name: name,
  });

  if (!promoCode) {
    return null;
  }

  // Check if promo code is expired
  if (promoCode.expiresAt && new Date(promoCode.expiresAt) < new Date()) {
    return null;
  }

  // Check if usage limit is exceeded
  if (promoCode.usageLimit && promoCode.usageCount >= promoCode.usageLimit) {
    return null;
  }

  return promoCode;
}
