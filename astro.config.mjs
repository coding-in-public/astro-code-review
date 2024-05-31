import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import db from "@astrojs/db";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), icon(), db()],
  experimental: {
    actions: true
  },
  output: "server",
  adapter: vercel()
});