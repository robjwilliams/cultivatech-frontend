import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useSession } from "next-auth/react";

export default function Nav() {
  const session = useSession();

  return (
    <NavStyles>
      <>
        {session.status !== "authenticated" ? (
          <Link href="/api/auth/signin">Sign In</Link>
        ) : (
          <Link href="/api/auth/signout">Sign Out</Link>
        )}
      </>
    </NavStyles>
  );
}
