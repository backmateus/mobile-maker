"use server";

import { cadastroSchema } from "@/lib/validations";
import { supabaseAdmin } from "@/lib/supabase";
import { montarMensagemWhatsApp, montarLinkWhatsApp } from "@/lib/whatsapp";

export interface CriarCadastroState {
  status: "idle" | "error" | "success";
  message?: string;
  whatsappUrl?: string;
  values?: Record<string, string>;
  attempt: number;
}

export async function criarCadastro(
  prevState: CriarCadastroState,
  formData: FormData
): Promise<CriarCadastroState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
  const attempt = prevState.attempt + 1;
  const parsed = cadastroSchema.safeParse(raw);

  if (!parsed.success) {
    const primeiroErro = parsed.error.issues[0]?.message ?? "Verifique os campos do formulário.";
    return { status: "error", message: primeiroErro, values: raw, attempt };
  }

  const dados = parsed.data;

  const { data: cadastro, error } = await supabaseAdmin
    .from("cadastros")
    .insert({
      confronto: dados.confronto,
      data_jogo: dados.data_jogo,
      horario: dados.horario,
      local: dados.local,
      atleta_nome: dados.atleta_nome,
      time_atleta: dados.time_atleta,
      sub: dados.sub,
      numero: dados.numero,
      posicao: dados.posicao,
      musica: dados.musica || null,
      instagram: dados.instagram,
      responsavel_nome: dados.responsavel_nome,
    })
    .select("id")
    .single();

  if (error || !cadastro) {
    console.error("Erro ao salvar cadastro:", error);
    return {
      status: "error",
      message: "Não foi possível salvar o cadastro. Tente novamente.",
      values: raw,
      attempt,
    };
  }

  const mensagem = montarMensagemWhatsApp(dados);
  const whatsappUrl = montarLinkWhatsApp(mensagem);

  return { status: "success", whatsappUrl, attempt };
}
