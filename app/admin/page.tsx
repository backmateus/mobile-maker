import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { ADMIN_COOKIE_NAME, verificarSessionToken } from "@/lib/auth";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const autenticado = await verificarSessionToken(
    cookieStore.get(ADMIN_COOKIE_NAME)?.value
  );

  if (autenticado) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 py-16">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gold">Painel do Felipe</h1>
        <p className="text-sm text-muted">Digite a senha para acessar os cadastros</p>
      </div>
      <div className="rounded-2xl border border-border bg-surface/60 p-6">
        <LoginForm />
      </div>
    </div>
  );
}
