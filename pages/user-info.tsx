// app/user-info.tsx

"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserInfo() {
  const session = useSession();

  if (session.status !== "authenticated") return <></>;

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>;
      <Link href="/api/auth/signout">Sign Out</Link>
    </>
  );
}
