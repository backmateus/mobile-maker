"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { excluirCadastro } from "@/app/admin/actions";

export default function DeleteButton({
  id,
  atletaNome,
}: {
  id: string;
  atletaNome: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        const confirmado = window.confirm(
          `Excluir o cadastro de "${atletaNome}"? Essa ação não pode ser desfeita.`
        );
        if (!confirmado) return;

        startTransition(async () => {
          await excluirCadastro(id);
          router.push("/admin/dashboard");
        });
      }}
      className="w-full rounded-lg border border-danger/50 px-6 py-3 text-sm font-semibold text-danger transition-colors hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Excluindo..." : "🗑️ Excluir cadastro"}
    </button>
  );
}
