import { defineField, defineType } from "sanity";

export default defineType({
  name: "purchaser",
  title: "Promo Code Redeemers",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "promoCode",
      title: "Promo Code",
      type: "reference",
      to: [{ type: "promoCode" }],
      description: "The promo code that was redeemed",
    }),
    defineField({
      name: "promoCodeUsed",
      title: "Code Used",
      type: "string",
      description: "The actual code that was entered",
      readOnly: true,
    }),
    defineField({
      name: "book",
      title: "Book",
      type: "reference",
      to: [{ type: "book" }],
      description: "The book that was sent",
    }),
    defineField({
      name: "redeemedAt",
      title: "Redeemed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      email: "email",
      promoCode: "promoCodeUsed",
      bookTitle: "book.title",
      redeemedAt: "redeemedAt",
    },
    prepare({ email, promoCode, bookTitle, redeemedAt }) {
      const date = redeemedAt ? new Date(redeemedAt).toLocaleDateString() : "Unknown";
      return {
        title: email,
        subtitle: `${promoCode || "N/A"} • ${bookTitle || "Unknown book"} • ${date}`,
      };
    },
  },
});

