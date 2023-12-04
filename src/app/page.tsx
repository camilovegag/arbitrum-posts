"use client";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { authUser, isLogged } = useAuth();
  return (
    <section>
      <h1>Hola mundo</h1>
      <pre>{JSON.stringify(authUser, null, 2)}</pre>
      <pre>{JSON.stringify(isLogged)}</pre>
    </section>
  );
}
