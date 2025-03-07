import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold my-4">
        Welcome, {session.user?.email}!
      </h1>
      <div>
        <Link href="/notes">Go to Notes</Link>
      </div>
    </div>
  );
}
