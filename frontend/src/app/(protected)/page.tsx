import { Table } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div>
      <h1>My account</h1>

      {/* cards: https://react-bootstrap.netlify.app/docs/components/cards */}
      {/* // images : https://react-bootstrap.netlify.app/docs/components/images */}
      {/* Checks https://react-bootstrap.netlify.app/docs/forms/checks-radios */}
      {/* forms https://react-bootstrap.netlify.app/docs/forms/floating-labels */}
      {/* forms layout https://react-bootstrap.netlify.app/docs/forms/layout */}
      {/* forms validation: https://react-bootstrap.netlify.app/docs/forms/validation */}
      <Table></Table>
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
