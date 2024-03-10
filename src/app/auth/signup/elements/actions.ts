"use server";
import User from "@/lib/mongo/UserSchema";
import dbConnect from "@/lib/mongo/mongodb";
import { z } from "zod";

export async function createUser(
  prevState: { message: string; success: boolean },
  formData: FormData
) {
  await dbConnect();
  const validatedFields = z
    .object({
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
      username: z
        .string()
        .min(6, "Username must be at least 6 characters")
        .regex(/^\S*$/, "Username cannot contain spaces")
        .trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    })
    .safeParse({
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.errors[0].message,
    };
  }
  const { email, username } = validatedFields.data;

  const existingUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email or username already exists.",
    };
  }

  try {
    const user = await User.create(validatedFields.data);

    if (!user) {
      return { success: false, message: "User not created." };
    }

    return {
      success: true,
      message: "User created successfully. Please sign in.",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while creating the user.",
    };
  }
}
