import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import User from "@/lib/mongo/UserSchema";
import dbConnect from "@/lib/mongo/mongodb";
import { revalidatePath } from "next/cache";

async function getUser(
  identifier: { key: string; value: string },
  password: string
) {
  try {
    dbConnect();

    const user = await User.findOne({ [identifier.key]: identifier.value });

    if (!user) {
      throw new Error("(Email/Username)/password mismatch");
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch) {
      return user;
    } else {
      throw Error("(Email/Username)/password mismatch");
    }
  } catch (error) {
    throw error;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ identifier: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { identifier, password } = parsedCredentials.data;
          const isEmail = identifier.includes("@");
          const user = await getUser(
            { key: isEmail ? "email" : "username", value: identifier },
            password
          );
          if (!user) return null;

          return {
            id: user._id.toString(),
            username: user.username,
            image: user.image || "",
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
});
