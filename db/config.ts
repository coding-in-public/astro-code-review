import { column, defineDb, defineTable } from "astro:db";

const Review = await defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    demoUrl: column.text(),
    repoUrl: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Review },
});
