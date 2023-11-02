import { createCookieSessionStorage } from "@remix-run/node";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [import.meta.env.SESSION_SECRET as string],
    secure: import.meta.env.MODE === "production",
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
