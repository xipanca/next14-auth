"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormStatus, useFormState } from "react-dom";
import { LoginUser } from "./actions";
import { Loader } from "lucide-react";
export default function SignInForm() {
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(LoginUser, initialState);
  const { pending } = useFormStatus();
  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      <Input name="email" type="text" placeholder="Email" />
      <Input name="password" type="password" placeholder="Password" />

      <Button
        type="submit"
        aria-disabled={pending}
        className={pending ? "bg-slate-950" : ""}
      >
        {pending ? <Loader /> : "Sign Up"}
      </Button>
      <p className="font-light text-center text-red-400"> *{state.message}</p>
    </form>
  );
}