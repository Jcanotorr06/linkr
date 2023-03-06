import { z } from "zod";

export const LinkSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  slug: z.string(),
  description: z.string(),
});

export const CreateLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string(),
  description: z.string().optional(),
});

export const EditLinkSchema = z.object({
  slug: z.string(),
  url: z.string().url(),
  description: z.string().optional(),
});

export const FilterLinkSchema = z.object({
  slug: z.string(),
});

export type LinkInput = z.TypeOf<typeof LinkSchema>;
export type CreateLinkInput = z.TypeOf<typeof CreateLinkSchema>;
export type EditLinkInput = z.TypeOf<typeof EditLinkSchema>;
export type FilterLinkInput = z.TypeOf<typeof FilterLinkSchema>;
