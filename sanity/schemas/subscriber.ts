import { defineField, defineType } from "sanity";

export default defineType({
  name: "subscriber",
  title: "Newsletter Subscribers",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Is this subscription active?",
      initialValue: true,
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where did this subscriber come from?",
      options: {
        list: [
          { title: "Website Footer", value: "footer" },
          { title: "Contact Page", value: "contact" },
          { title: "Manual", value: "manual" },
        ],
      },
      initialValue: "footer",
    }),
  ],
  preview: {
    select: {
      email: "email",
      active: "active",
      subscribedAt: "subscribedAt",
    },
    prepare({ email, active, subscribedAt }) {
      return {
        title: email,
        subtitle: `${active ? "✓ Active" : "✗ Inactive"} • ${new Date(subscribedAt).toLocaleDateString()}`,
      };
    },
  },
});

