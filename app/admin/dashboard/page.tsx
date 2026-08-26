import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { statusLabels, statusOptions } from "@/lib/validations";
import StatusBadge from "@/components/admin/StatusBadge";

function formatarData(dataISO: string) {
  const [ano, mes, dia] = dataISO.split("-");
  if (!ano || !mes || !dia) return dataISO;
  return `${dia}/${mes}/${ano}`;
}

export default async function DashboardPage({
  searchParams,
}: PageProps<"/admin/dashboard">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const status = typeof params.status === "string" ? params.status : "";

  let query = supabaseAdmin
    .from("cadastros")
    .select("*")
    .order("created_at", { ascending: false });

  if (q) {
    query = query.ilike("atleta_nome", `%${q}%`);
  }
  if (status && statusOptions.includes(status as (typeof statusOptions)[number])) {
    query = query.eq("status", status);
  }

  const { data: cadastros, error } = await query;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Cadastros</h1>
        <span className="text-sm text-muted">
          {cadastros?.length ?? 0} resultado(s)
        </span>
      </div>

      <form className="flex flex-col gap-3 sm:flex-row" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nome do atleta"
          className="w-full flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
        />
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold focus:ring-1 focus:ring-gold"
        >
          <option value="">Todos os status</option>
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {statusLabels[opt]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-black hover:bg-gold-light transition-colors"
        >
          Filtrar
        </button>
      </form>

      {error && (
        <p className="rounded-lg border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-danger">
          Erro ao carregar cadastros.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {cadastros?.length === 0 && (
          <p className="py-10 text-center text-sm text-muted">
            Nenhum cadastro encontrado.
          </p>
        )}
        {cadastros?.map((c) => (
          <Link
            key={c.id}
            href={`/admin/cadastro/${c.id}`}
            className="flex flex-col gap-2 rounded-xl border border-border bg-surface/60 p-4 transition-colors hover:border-gold/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-foreground">
                {c.atleta_nome}
              </span>
              <span className="text-sm text-muted">
                {c.confronto} · {formatarData(c.data_jogo)}
              </span>
            </div>
            <StatusBadge status={c.status} />
          </Link>
        ))}
      </div>
    </div>
  );
}
