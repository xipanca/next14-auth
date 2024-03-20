import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div className="w-full flex justify-center items-start pt-24">
      {children}
    </div>
  );
}
