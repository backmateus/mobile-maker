import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { linkWhatsAppDoCadastro } from "@/lib/whatsapp";
import StatusSelect from "@/components/admin/StatusSelect";
import DeleteButton from "@/components/admin/DeleteButton";

function formatarData(dataISO: string) {
  const [ano, mes, dia] = dataISO.split("-");
  if (!ano || !mes || !dia) return dataISO;
  return `${dia}/${mes}/${ano}`;
}

function Campo({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="text-base text-foreground">{valor}</span>
    </div>
  );
}

export default async function CadastroDetailPage({
  params,
}: PageProps<"/admin/cadastro/[id]">) {
  const { id } = await params;

  const { data: cadastro } = await supabaseAdmin
    .from("cadastros")
    .select("*")
    .eq("id", id)
    .single();

  if (!cadastro) {
    notFound();
  }

  const whatsappUrl = linkWhatsAppDoCadastro(cadastro);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/dashboard" className="text-sm text-muted hover:text-foreground">
        ← Voltar para cadastros
      </Link>

      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface/60 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            {cadastro.atleta_nome}
          </h1>
        </div>

        <StatusSelect id={cadastro.id} statusAtual={cadastro.status} />

        <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
          <Campo label="Confronto" valor={cadastro.confronto} />
          <Campo
            label="Data e horário"
            valor={`${formatarData(cadastro.data_jogo)} às ${cadastro.horario}`}
          />
          <Campo label="Local" valor={cadastro.local} />
          <Campo label="Time" valor={cadastro.time_atleta} />
          <Campo label="Sub" valor={cadastro.sub} />
          <Campo label="Número" valor={cadastro.numero} />
          <Campo label="Posição" valor={cadastro.posicao} />
          <Campo label="Música" valor={cadastro.musica || "Não informado"} />
          <Campo label="Instagram" valor={cadastro.instagram} />
          <Campo label="Responsável" valor={cadastro.responsavel_nome} />
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 py-4 text-base font-bold text-black shadow-lg transition-colors hover:bg-whatsapp-dark"
        >
          📲 Reenviar no WhatsApp
        </a>

        <DeleteButton id={cadastro.id} atletaNome={cadastro.atleta_nome} />
      </div>
    </div>
  );
}
