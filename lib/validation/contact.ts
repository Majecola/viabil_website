import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(8).max(40),
  segment: z.string().trim().max(120).optional().or(z.literal("")),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  sourcePage: z.string().trim().max(240).optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
});

export const newsletterSubscribeSchema = z.object({
  email: z.string().trim().email().max(180),
  name: z.string().trim().max(120).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  segment: z.string().trim().max(120).optional().or(z.literal("")),
  sourcePage: z.string().trim().max(240).optional().or(z.literal("")),
});

export const replySchema = z.object({
  subject: z.string().trim().min(3).max(180),
  body: z.string().trim().min(10).max(6000),
});

export const newsletterCampaignSchema = z.object({
  title: z.string().trim().min(3).max(180),
  subject: z.string().trim().min(3).max(180),
  audience: z.enum(["all_subscribed", "leads", "customers"]),
  previewText: z.string().trim().max(220).optional().or(z.literal("")),
  bodyHtml: z.string().trim().min(20).max(50000),
});
