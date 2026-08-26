"use client";

import { useTransition } from "react";
import { atualizarStatusCadastro } from "@/app/admin/actions";
import { statusLabels, statusOptions } from "@/lib/validations";
import type { StatusCadastro } from "@/lib/supabase";

export default function StatusSelect({
  id,
  statusAtual,
}: {
  id: string;
  statusAtual: StatusCadastro;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-muted">Status</span>
      <select
        defaultValue={statusAtual}
        disabled={isPending}
        onChange={(e) => {
          const novoStatus = e.target.value as StatusCadastro;
          startTransition(() => {
            atualizarStatusCadastro(id, novoStatus);
          });
        }}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground outline-none focus:border-gold focus:ring-1 focus:ring-gold disabled:opacity-60"
      >
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>
            {statusLabels[opt]}
          </option>
        ))}
      </select>
    </label>
  );
}
