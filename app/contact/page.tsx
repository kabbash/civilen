"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PrimaryButton } from "@/components/ui/primary-button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        setSubmitStatus("error");
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-white">
      {/* Hero Section with Engineer Background */}
      <section className="relative h-[963px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/contact-us.jpg"
            alt="Engineer Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Title */}
        <div className="absolute top-[140px] left-1/2 -translate-x-1/2 bg-[rgba(234,84,34,0.5)] px-10 py-2.5 backdrop-blur-[10px]">
          <h1 className="font-gotham-bold text-5xl leading-[72px] whitespace-nowrap text-white">
            Inquiries and Support
          </h1>
        </div>

        {/* Contact Form */}
        <div className="absolute top-[272px] left-1/2 w-[630px] -translate-x-1/2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 rounded-[4px] bg-[rgba(255,255,255,0.8)] px-[60px] py-6 shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)] backdrop-blur-[10px]"
          >
            {/* Name Field */}
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="name"
                className="font-gotham-medium text-lg leading-[27px] text-black"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                className="font-gotham-book h-12 rounded-none border-0 border-b border-[#ea5422] bg-white px-4 py-2.5 text-lg shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] placeholder:opacity-60"
              />
            </div>

            {/* Email Field */}
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-gotham-medium text-lg leading-[27px] text-black"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="johndoe@gmail.com"
                required
                className="font-gotham-book h-12 rounded-none border-0 border-b border-[#ea5422] bg-white px-4 py-2.5 text-lg shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] placeholder:opacity-60"
              />
            </div>

            {/* Subject Field */}
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="subject"
                className="font-gotham-medium text-lg leading-[27px] text-black"
              >
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Subject title"
                required
                className="font-gotham-book h-12 rounded-none border-0 border-b border-[#ea5422] bg-white px-4 py-2.5 text-lg shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] placeholder:opacity-60"
              />
            </div>

            {/* Message Field */}
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="message"
                className="font-gotham-medium text-lg leading-[27px] text-black"
              >
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message here..."
                required
                className="font-gotham-book h-[120px] resize-none rounded-none border-0 border-b border-[#ea5422] bg-white px-4 py-2.5 text-lg shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] placeholder:opacity-60"
              />
            </div>

            {/* Submit Button */}
            <PrimaryButton type="submit" disabled={isSubmitting} className="w-auto self-center">
              {isSubmitting ? "Sending..." : "Send Message"}
            </PrimaryButton>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <p className="font-gotham-medium text-center text-green-600">
                Message sent successfully! We&apos;ll get back to you soon.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="font-gotham-medium text-center text-red-600">
                Failed to send message. Please try again later.
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
