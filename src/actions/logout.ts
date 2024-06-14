import { lucia } from "@/auth";
import { defineAction } from "astro:actions";

export const logout = defineAction({
  handler: async (_, context) => {
    if (!context.locals.session) {
      return new Response(null, {
        status: 401,
      });
    }

    await lucia.invalidateSession(context.locals.session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return context.redirect("/");
  },
});
