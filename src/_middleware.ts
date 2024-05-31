import { defineMiddleware } from "astro:middleware";
import { lucia } from "@/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  // const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;

  // const { pathname } = context.url;

  // if (!sessionId) {
  //   const sessionCookie = lucia.createBlankSessionCookie();
  //   context.cookies.set(
  //     sessionCookie.name,
  //     sessionCookie.value,
  //     sessionCookie.attributes
  //   );
  //   context.locals.user = null;
  //   context.locals.session = null;

  //   if (
  //     pathname !== "/create" &&
  //     pathname !== "/login" &&
  //     context.request.method === "GET"
  //   ) {
  //     return context.redirect("/login");
  //   }
  // }

  // if (sessionId) {
  //   const { session, user } = await lucia.validateSession(sessionId);
  //   if (session && session.fresh) {
  //     const sessionCookie = lucia.createSessionCookie(session.id);
  //     context.cookies.set(
  //       sessionCookie.name,
  //       sessionCookie.value,
  //       sessionCookie.attributes
  //     );
  //   }
  //   context.locals.session = session;
  //   context.locals.user = user;
  //   if (pathname === "/create" || pathname === "/login") {
  //     return context.redirect("/");
  //   }
  // }
  return next();
});
