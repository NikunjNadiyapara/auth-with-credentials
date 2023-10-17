import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOpptions } from "../api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOpptions);

  if (session) redirect("/dashboard");
  return <RegisterForm />;
}
