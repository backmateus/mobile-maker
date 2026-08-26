"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { criarCadastro, type CriarCadastroState } from "@/app/actions";
import ConfirmacaoWhatsApp from "./ConfirmacaoWhatsApp";

const estadoInicial: CriarCadastroState = { status: "idle", attempt: 0 };

function Campo({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-muted">
        {label}
        {!required && <span className="text-muted/70"> (opcional)</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted/60 outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
      />
    </label>
  );
}

function BotaoEnviar() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-gold px-6 py-4 text-base font-bold text-black transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Enviando..." : "Confirmar cadastro"}
    </button>
  );
}

function SecaoTitulo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-wider text-gold">
      {children}
    </h2>
  );
}

export default function CadastroForm() {
  const [state, formAction] = useActionState(criarCadastro, estadoInicial);

  if (state.status === "success" && state.whatsappUrl) {
    return <ConfirmacaoWhatsApp whatsappUrl={state.whatsappUrl} />;
  }

  const v = state.values ?? {};

  return (
    <form key={state.attempt} action={formAction} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <SecaoTitulo>⚽ Jogo</SecaoTitulo>
        <Campo
          label="Confronto"
          name="confronto"
          placeholder="Time A x Time B"
          defaultValue={v.confronto}
        />
        <div className="grid grid-cols-2 gap-4">
          <Campo label="Data" name="data_jogo" type="date" defaultValue={v.data_jogo} />
          <Campo label="Horário" name="horario" type="time" defaultValue={v.horario} />
        </div>
        <Campo
          label="Local"
          name="local"
          placeholder="Ginásio, arena ou endereço"
          defaultValue={v.local}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SecaoTitulo>👤 Atleta</SecaoTitulo>
        <Campo label="Nome do atleta" name="atleta_nome" defaultValue={v.atleta_nome} />
        <div className="grid grid-cols-2 gap-4">
          <Campo label="Time" name="time_atleta" defaultValue={v.time_atleta} />
          <Campo
            label="Sub (categoria)"
            name="sub"
            placeholder="Ex: Sub-13"
            defaultValue={v.sub}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Campo label="Número da camisa" name="numero" defaultValue={v.numero} />
          <Campo label="Posição" name="posicao" defaultValue={v.posicao} />
        </div>
        <Campo
          label="Música"
          name="musica"
          required={false}
          placeholder="Música para o vídeo"
          defaultValue={v.musica}
        />
        <Campo
          label="Instagram"
          name="instagram"
          placeholder="@usuario"
          defaultValue={v.instagram}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SecaoTitulo>Responsável</SecaoTitulo>
        <Campo
          label="Nome do responsável"
          name="responsavel_nome"
          defaultValue={v.responsavel_nome}
        />
      </section>

      {state.status === "error" && (
        <p className="rounded-lg border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      )}

      <BotaoEnviar />
    </form>
  );
}
