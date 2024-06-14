import { lucia } from "@/auth";
import { defineAction, z } from "astro:actions";
import { User, db, eq } from "astro:db";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

export const create = defineAction({
  accept: "form",
  input: z.object({
    honeypot: z.string().optional(),

    username: z.string().min(5, {
      message: "Username must be at least 5 characters",
    }),
    password: z.string().min(7, {
      message: "Password must be at least 7 characters",
    }),
  }),
  handler: async (input, context) => {
    const { username, password, honeypot } = input;

    console.log(username, password, honeypot);

    if (honeypot) {
      return;
    }

    const usersMatching = await db
      .select()
      .from(User)
      .where(eq(User.username, username));

    if (usersMatching.length > 1) {
      throw new Error("User already exists");
    }

    // create userID
    const userId = generateId(16);

    // hash password
    const hashedPassword = await new Argon2id().hash(password);

    // create user
    await db.insert(User).values({
      id: userId,
      username,
      password_hash: hashedPassword,
    });

    // create session cookies
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return true;
  },
});
