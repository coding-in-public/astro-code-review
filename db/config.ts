import { NOW, column, defineDb, defineTable } from "astro:db";

const Review = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    demoUrl: column.text(),
    repoUrl: column.text(),
    featured: column.boolean({ default: false }),
    isReviewed: column.boolean({ default: false }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ unique: true }),
    expiresAt: column.number(),
    userId: column.text({ references: () => User.columns.id }),
  },
});

const User = defineTable({
  columns: {
    id: column.text({ unique: true, primaryKey: true }),
    username: column.text({ unique: true }),
    password_hash: column.text(),
    createdAt: column.date({ default: NOW }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Review, Session, User },
});
