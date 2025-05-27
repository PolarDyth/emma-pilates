"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSuccess(true);

    // Reset form after showing success state
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 relative">
        {/* Success overlay */}
        {isSuccess && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-md z-10 animate-in fade-in duration-300">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4 animate-in zoom-in-50 duration-300" />
            <p className="text-lg font-medium">Message Sent Successfully!</p>
            <p className="text-muted-foreground">
              Thank you for contacting Emma.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="How can I help you?"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full group"
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </>
          )}
        </Button>
      </form>
      <div className="mt-6 p-4 bg-accent/20 rounded-lg text-center">
        <blockquote className="text-sm italic text-primary font-medium">
          &quot;Change happens through movement and movement heals&quot;
        </blockquote>
        <cite className="text-xs text-muted-foreground mt-2 block">
          — Joseph Pilates
        </cite>
      </div>
    </div>
  );
}
