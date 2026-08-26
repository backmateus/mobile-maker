import { cookies } from "next/headers";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ADMIN_COOKIE_NAME, verificarSessionToken } from "@/lib/auth";
import { logoutAdmin } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const autenticado = await verificarSessionToken(
    cookieStore.get(ADMIN_COOKIE_NAME)?.value
  );

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8">
      <header className="flex items-center justify-between border-b border-border pb-4">
        <Link href={autenticado ? "/admin/dashboard" : "/admin"} className="flex items-center gap-3">
          <Logo size={48} />
          <span className="text-lg font-bold text-gold">
            Mobile Maker <span className="text-muted font-normal">· Painel</span>
          </span>
        </Link>
        {autenticado && (
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Sair
            </button>
          </form>
        )}
      </header>
      {children}
    </div>
  );
}
