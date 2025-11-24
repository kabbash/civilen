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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }, 1000);
  };

  return (
    <main className="relative w-full min-h-screen bg-white">
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
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Title */}
        <div className="absolute left-1/2 top-[140px] -translate-x-1/2 backdrop-blur-[10px] bg-[rgba(234,84,34,0.5)] px-10 py-2.5">
          <h1 className="font-gotham-bold text-5xl leading-[72px] text-white whitespace-nowrap">
            Inquiries and Support
          </h1>
        </div>

        {/* Contact Form */}
        <div className="absolute left-1/2 top-[272px] -translate-x-1/2 w-[630px]">
          <form 
            onSubmit={handleSubmit}
            className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.8)] rounded-[4px] shadow-[0px_3px_10px_0px_rgba(190,64,22,0.25)] px-[60px] py-6 flex flex-col gap-8"
          >
            {/* Name Field */}
            <div className="flex flex-col gap-1.5 w-full">
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
                className="h-12 bg-white border-0 border-b border-[#ea5422] rounded-none px-4 py-2.5 font-gotham-book text-lg shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] placeholder:opacity-60"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5 w-full">
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
                className="h-12 bg-white border-0 border-b border-[#ea5422] rounded-none px-4 py-2.5 font-gotham-book text-lg shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] placeholder:opacity-60"
              />
            </div>

            {/* Subject Field */}
            <div className="flex flex-col gap-1.5 w-full">
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
                className="h-12 bg-white border-0 border-b border-[#ea5422] rounded-none px-4 py-2.5 font-gotham-book text-lg shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] placeholder:opacity-60"
              />
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-1.5 w-full">
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
                className="h-[120px] bg-white border-0 border-b border-[#ea5422] rounded-none px-4 py-2.5 font-gotham-book text-lg shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)] placeholder:opacity-60 resize-none"
              />
            </div>

            {/* Submit Button */}
            <PrimaryButton 
              type="submit" 
              disabled={isSubmitting}
              className="w-auto self-center"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </PrimaryButton>

            {/* Success Message */}
            {submitStatus === "success" && (
              <p className="text-center font-gotham-medium text-green-600">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

