import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schema } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "civilen-publishing",
  title: "CivilEn Publishing",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],

  schema,
});
