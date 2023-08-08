import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  // session is always non-null inside this page, all the way down the React tree.
  return (
    <div>
      <h1>Admin Dashboar</h1>

      <div>
        <h1>{session?.user.name}</h1>
        <h1>{session?.user.email}</h1>
      </div>
    </div>
  );
}

AdminDashboard.auth = true;
