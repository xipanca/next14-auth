import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function userIsAdmin(): boolean {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user) {
      const { role } = session.user;
      setIsAdmin(role === "admin");
    }
  }, [session]);

  return isAdmin;
}
