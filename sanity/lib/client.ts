import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
  maxRetries: 2, // Retry failed requests up to 2 times
  retryDelay: () => 200, // Wait 200ms between retries
});

// Client with write permissions for API routes
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
