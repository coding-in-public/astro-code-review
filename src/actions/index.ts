import { defineAction, z } from "astro:actions";
import { db, Review } from "astro:db";

export const server = {
  review: defineAction({
    accept: "form",
    input: z.object({
      honeypot: z.string().optional(),
      name: z.string().min(1, {
        message: "Name must be at least 1 character",
      }),
      demoUrl: z.string().url({
        message: "Must provide a valid URL",
      }),
      repoUrl: z.string().url({
        message: "Must provide a valid URL",
      }),
    }),
    handler: async (obj) => {
      if (obj.honeypot) {
        return;
      }

      await db.insert(Review).values(obj);

      return true;
    },
  }),
};
