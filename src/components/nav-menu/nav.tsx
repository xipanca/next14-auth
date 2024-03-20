import Link from "next/link";
import Session from "./session";
export default function Nav() {
  return (
    <nav className="flex justify-center w-full border-b">
      <div className="flex items-center justify-between w-full sm:w-10/12 p-4">
        <div className="text-2xl font-semibold">NEXT-AUTH</div>
        <div className="flex gap-8 flex-row cursor-pointer ">
          <NavLink label="HOME" path="/" />
          <NavLink label="USER" path="/dash" />
        </div>
        <Session />
      </div>
    </nav>
  );
}

function NavLink({ label, path }: { label: string; path: string }) {
  return (
    <Link className="hover:underline" href={path}>
      {label}
    </Link>
  );
}
