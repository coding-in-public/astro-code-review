import { lucia } from "@/auth";
import { defineAction, z } from "astro:actions";
import { Review, db, eq, not } from "astro:db";

export const feature = defineAction({
  accept: "json",
  input: z.object({
    id: z.number(),
  }),
  handler: async ({ id }, context) => {
    const sessionId =
      context.cookies.get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return;
    }

    const updatedDb = await db
      .update(Review)
      .set({ featured: not(Review.featured) })
      .where(eq(Review.id, id));

    return updatedDb;
  },
});
