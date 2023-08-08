import { useSession } from 'next-auth/react';
import React from 'react';

function Todos() {
  const { data: sessionData } = useSession();
  return (
    <div>
      <h1>{sessionData?.user.id}</h1>
      <h1>{sessionData?.user.name}</h1>
      <h2>{sessionData?.user.email}</h2>
    </div>
  );
}

export default Todos;
