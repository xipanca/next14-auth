"use client";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Signout } from "./signout";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
export default function Session() {
  const { data } = useSession();

  return (
    <div className="flex flex-row gap-4 items-center">
      {!data?.user && (
        <div className="flex flex-row gap-4 items-center">
          <Link href="/auth/signin">
            <Button>Sign in</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant={"outline"}>Sign up</Button>
          </Link>
        </div>
      )}
      <div className="flex flex-row gap-4 items-center">
        {data?.user.role == "admin" && (
          <Link href="/admin">
            <Button>Admin</Button>
          </Link>
        )}
        {data?.user && (
          <div className="flex flex-row gap-4 items-center">
            <label>{data.user.username}</label>
            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
}

function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <form action={Signout}>
      <Button type="submit" variant={"secondary"}>
        {pending ? <Loader /> : "Sign Out"}
      </Button>
    </form>
  );
}
