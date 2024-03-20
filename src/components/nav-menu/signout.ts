"use server";
import { signOut } from "@/lib/auth";

export async function Signout() {
  await signOut();
}
