// Display user session.

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <h2>Welcome, {session.user.email}!</h2>
      <p>Access Token: {session.accessToken}</p>
    </div>
  );
}
