import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schema } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

// Custom structure with default ordering by 'order' field
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const structure = (S: any) =>
  S.list()
    .title("Content")
    .items([
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
      // Subscribers - keep default
      S.listItem()
        .title("Subscribers")
        .schemaType("subscriber")
        .child(S.documentTypeList("subscriber").title("Subscribers")),
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
