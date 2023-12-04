"use client";

import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { authUser, isLogged } = useAuth();
  return (
    <section>
      <h1>Hola mundo</h1>
      <pre>{JSON.stringify(authUser)}</pre>
      <pre>{JSON.stringify(isLogged)}</pre>
      {isLogged && (
        <>
          <p>User info:</p>
          <p>Address: {authUser?.address}</p>
          <p>{authUser?.likes} likes</p>
        </>
      )}
    </section>
  );
}
