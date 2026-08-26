import { statusLabels } from "@/lib/validations";
import type { StatusCadastro } from "@/lib/supabase";

const cores: Record<StatusCadastro, string> = {
  nova: "bg-gold/15 text-gold border-gold/40",
  em_captacao: "bg-blue-500/15 text-blue-300 border-blue-500/40",
  em_edicao: "bg-purple-500/15 text-purple-300 border-purple-500/40",
  entregue: "bg-whatsapp/15 text-whatsapp border-whatsapp/40",
};

export default function StatusBadge({ status }: { status: StatusCadastro }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cores[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
