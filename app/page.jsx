import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOpptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOpptions);

  if (session) redirect("/dashboard");
  return (
    <main>
      <LoginForm />
    </main>
  );
}
