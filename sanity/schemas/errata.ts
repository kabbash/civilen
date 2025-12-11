import { defineField, defineType } from "sanity";

export default defineType({
  name: "errata",
  title: "Errata",
  type: "document",
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "dateReported", direction: "desc" },
      ],
    },
    {
      title: "Date Reported, New",
      name: "dateReportedDesc",
      by: [{ field: "dateReported", direction: "desc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "book",
      title: "Book",
      type: "reference",
      to: [{ type: "book" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "edition",
      title: "Edition",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "page",
      title: "Page Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "statement",
      title: "Incorrect Statement",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "correction",
      title: "Correction",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateReported",
      title: "Date Reported",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Draft", value: "draft" },
          { title: "Resolved", value: "resolved" },
        ],
      },
      initialValue: "published",
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
      book: "book.title",
      page: "page",
    },
    prepare(selection) {
      const { title, book, page } = selection;
      return {
        title,
        subtitle: `${book} - Page ${page}`,
      };
    },
  },
});
