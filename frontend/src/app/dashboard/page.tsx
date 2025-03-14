import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <h1 className="text-4xl font-bold my-4">ÚKOLY</h1>
      <div>
        <Link href="/notes">Zobrazit úkoly</Link>
      </div>
      <LogoutButton />
      {session && (
        <div>
          Přihlášený uživatel: <b>{session.user?.email}</b>
        </div>
      )}
    </div>
  );
}
