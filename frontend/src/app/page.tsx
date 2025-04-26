import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NavMenu } from "@/components/NavMenu";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <NavMenu />

      {session && (
        <div>
          <div>
            Přihlášený uživatel: <b>{session.user.email}</b>
          </div>
          <div>
            <p>
              Role uživatele: <b>{session.user.role}</b>
            </p>
            <p>
              Exp: <b>{session.expires}</b>
            </p>
            <p>
              Name: <b>{session.user.name}</b>
            </p>
            <p>
              id: <b>{session.user.id}</b>
            </p>
          </div>
        </div>
      )}
      <div>
        {session.user.role === "ADMIN" && (
          <Link href="/notes">Zobrazit úkoly</Link>
        )}
      </div>
    </div>
  );
}
