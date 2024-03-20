"use client";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data } = useSession();
  return (
    <main className="flex">
      <pre className="text-white">{JSON.stringify(data?.user, null, 1)}</pre>
    </main>
  );
}
