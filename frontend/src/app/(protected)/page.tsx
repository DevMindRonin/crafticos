// import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      {/* 
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
      </div> */}
    </div>
  );
}
