import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema, profileSchema } from "../schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
  .get("/current", sessionMiddleware, (c) => {
    const user = c.get("user");
    return c.json({ data: user });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    try {
      await account.create(ID.unique(), email, password, name);
    } catch (error) {
      return c.json({ error: error.message }, 400);
    }

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    return c.json({ success: true });
  })
  .post("/logout", sessionMiddleware, async (c) => {
    const account = await c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true });
  })
  .delete("/delete", sessionMiddleware, async (c) => {
    const { account } = await createAdminClient();
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await account.deleteIdentity(user.$id);

    return c.json({ success: true });
  })
  .post(
    "/addUserDetails",
    sessionMiddleware,
    zValidator("json", profileSchema),
    async (c) => {
      const { name, fullName, email, phoneNumber, location, postalCode } =
        c.req.valid("json");
      const user = c.get("user");

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { databases } = await createAdminClient();

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_USER_DETAILS_ID,
        user.$id,
        {
          userId: user.$id,
          name,
          fullName,
          email,
          phoneNumber,
          location,
          postalCode,
        }
      );

      return c.json({ success: true });
    }
  )
  .get("/getUserById/:id", sessionMiddleware, async (c) => {
    const { id } = c.req.param();
    const user = c.get("user");

    if (!id) {
      return c.json({ error: "User ID is required" }, 400);
    }

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { databases } = await createAdminClient();

    if (!databases) {
      console.error("Databases object is undefined");
      return c.json(
        { error: "Appwrite client is not properly initialized" },
        500
      );
    }

    try {
      // Fetch user profile data from the database using the user ID
      const data = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_USER_DETAILS_ID,
        id
      );
      const isAdmin = user?.labels?.[0] === "admin";

      if (data && isAdmin) {
        return c.json({ data });
      } else if (data) {
        return c.json({ data: { name: data.name } });
      } else {
        return c.json({ error: "User not found" }, 404);
      }
    } catch (error) {
      console.error(error);
      return c.json(
        { error: "An error occurred while fetching user data" },
        500
      );
    }
  })
  .post(
    "/updateDetails",
    sessionMiddleware,
    zValidator("json", profileSchema),
    async (c) => {
      const { name, fullName, email, phoneNumber, location, postalCode } =
        c.req.valid("json");
      const user = c.get("user");

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { databases } = await createAdminClient();

      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_USER_DETAILS_ID,
        user.$id,
        {
          name,
          fullName,
          email,
          phoneNumber,
          location,
          postalCode,
        }
      );

      return c.json({ success: true });
    }
  );

export default app;
