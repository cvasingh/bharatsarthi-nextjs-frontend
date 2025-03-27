import "server-only";
import { Account, Client, Databases, Storage, Models } from "node-appwrite";
import { createMiddleware } from "hono/factory";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { getCookie } from "hono/cookie";

export const sessionMiddleware = createMiddleware(async (c, next) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); // Your project ID

  const session = getCookie(c, AUTH_COOKIE);

  if (!session) {
    return c.json(
      {
        error: "Unauthorized",
      },
      401
    );
  }

  client.setSession(session);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  const user = await account.get();

  c.set("account", account);
  c.set("databases", databases);
  c.set("storage", storage);
  c.set("user", user);

  await next();
});
