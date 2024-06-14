import { Review, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Review).values({
    name: "Chris",
    demoUrl: "https://codinginpublic.dev",
    repoUrl: "https://codinginpublic.dev",
    featured: false,
    isReviewed: true,
  });
}
