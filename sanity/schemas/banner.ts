import { defineField, defineType } from "sanity";

export default defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Internal title for identification (not displayed on site)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Image Alt Text",
      type: "string",
      description: "Describes the banner image for accessibility and SEO",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desktopImage",
      title: "Desktop Image",
      type: "image",
      description: "Recommended: 1920×400 pixels (5:1 aspect ratio)",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile Image",
      type: "image",
      description: "Recommended: 750×400 pixels (2:1 aspect ratio)",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link URL",
      type: "string",
      description: "Where the CTA button links to (e.g., /books/steel-structures)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      description: "Text for the call-to-action button (e.g., Shop Now, Learn More)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Only active banners will be displayed on the site",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which to display (lower numbers first)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "desktopImage",
      isActive: "isActive",
      order: "order",
    },
    prepare(selection) {
      const { title, media, isActive, order } = selection;
      return {
        title: `${order ?? 0}. ${title}`,
        media,
        subtitle: isActive ? "✅ Active" : "❌ Inactive",
      };
    },
  },
});

