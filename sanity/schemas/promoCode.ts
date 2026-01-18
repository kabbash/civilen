import { defineField, defineType } from "sanity";

export default defineType({
  name: "promoCode",
  title: "Promo Code",
  type: "document",
  orderings: [
    {
      title: "Created Date, New",
      name: "createdAtDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name (URL Identifier)",
      type: "slug",
      description: "URL-friendly identifier used in the link (e.g., ?code=my-book-promo)",
      options: {
        source: "book.title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Promo Code",
      type: "string",
      description: "The secret promo code that users must enter to redeem",
      validation: (Rule) => Rule.required().uppercase(),
    }),
    defineField({
      name: "book",
      title: "Book",
      type: "reference",
      to: [{ type: "book" }],
      description:
        "Link this promo code to a specific book (Review URL will be pulled from the book)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "freeBookPdf",
      title: "Free Book PDF",
      type: "file",
      description: "The PDF file that will be sent to users who redeem this code",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Whether this promo code is currently active",
      initialValue: true,
    }),
    defineField({
      name: "expiresAt",
      title: "Expires At",
      type: "datetime",
      description: "Optional expiration date for this promo code",
    }),
    defineField({
      name: "usageLimit",
      title: "Usage Limit",
      type: "number",
      description: "Maximum number of times this code can be used (leave empty for unlimited)",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "usageCount",
      title: "Usage Count",
      type: "number",
      description: "Number of times this code has been used",
      initialValue: 0,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      name: "name.current",
      code: "code",
      active: "active",
      bookTitle: "book.title",
    },
    prepare(selection) {
      const { name, code, active, bookTitle } = selection;
      const status = active ? "✅" : "❌";
      const bookInfo = bookTitle ? ` → ${bookTitle}` : "";
      return {
        title: `${status} ${name || "No name"}`,
        subtitle: `Code: ${code}${bookInfo}`,
      };
    },
  },
});
