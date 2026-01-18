import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { EnvelopeIcon } from "@sanity/icons";

import { schema } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { ReviewReminderTool } from "./sanity/components/ReviewReminderTool";

// Custom structure with default ordering by 'order' field
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const structure = (S: any) =>
  S.list()
    .title("Content")
    .items([
      // Banners - ordered by 'order' field
      S.listItem()
        .title("Banners")
        .schemaType("banner")
        .child(
          S.documentTypeList("banner")
            .title("Banners")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.divider(),
      // Books - ordered by 'order' field
      S.listItem()
        .title("Books")
        .schemaType("book")
        .child(
          S.documentTypeList("book")
            .title("Books")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      // Articles - ordered by 'order' field
      S.listItem()
        .title("Articles")
        .schemaType("article")
        .child(
          S.documentTypeList("article")
            .title("Articles")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      // Errata - ordered by 'order' field
      S.listItem()
        .title("Errata")
        .schemaType("errata")
        .child(
          S.documentTypeList("errata")
            .title("Errata")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.divider(),
      // Promo Codes - ordered by creation date
      S.listItem()
        .title("Promo Codes")
        .schemaType("promoCode")
        .child(
          S.documentTypeList("promoCode")
            .title("Promo Codes")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
      // Purchasers - promo code redeemers
      S.listItem()
        .title("Purchasers")
        .schemaType("purchaser")
        .child(
          S.documentTypeList("purchaser")
            .title("Purchasers")
            .defaultOrdering([{ field: "redeemedAt", direction: "desc" }])
        ),
      // Subscribers - keep default
      S.listItem()
        .title("Subscribers")
        .schemaType("subscriber")
        .child(S.documentTypeList("subscriber").title("Subscribers")),
      S.divider(),
      // Review Reminder Tool - always visible in sidebar
      S.listItem()
        .title("📧 Send Review Reminder")
        .icon(EnvelopeIcon)
        .child(
          S.component(ReviewReminderTool)
            .title("Send Review Reminder")
            .id("review-reminder")
        ),
    ]);

export default defineConfig({
  name: "civilen-publishing",
  title: "CivilEn Publishing",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],

  schema,
});
