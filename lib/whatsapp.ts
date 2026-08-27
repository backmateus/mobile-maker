import type { Cadastro } from "./supabase";

export const FELIPE_WHATSAPP = "5511993437239";

function formatarData(dataISO: string) {
  const [ano, mes, dia] = dataISO.split("-");
  if (!ano || !mes || !dia) return dataISO;
  return `${dia}/${mes}/${ano}`;
}

function formatarInstagram(instagram: string) {
  const limpo = instagram.trim().replace(/^@/, "");
  return `@${limpo}`;
}

function formatarSub(sub: string) {
  const limpo = sub.trim().replace(/^sub[\s-]*/i, "");
  return `Sub-${limpo}`;
}

export function montarMensagemWhatsApp(cadastro: {
  confronto: string;
  data_jogo: string;
  horario: string;
  local: string;
  atleta_nome: string;
  time_atleta: string;
  sub: string;
  numero: string;
  posicao: string;
  musica: string;
  instagram: string;
  responsavel_nome: string;
}) {
  const linhas = [
    "📋 CONFIRMAÇÃO DE FILMAGEM",
    "",
    `⚽ Confronto: ${cadastro.confronto}`,
    `📅 Data: ${formatarData(cadastro.data_jogo)} às ${cadastro.horario}`,
    `📍 Local: ${cadastro.local}`,
    "",
    `👤 Atleta: ${cadastro.atleta_nome}`,
    `🏳️ Time: ${cadastro.time_atleta}  |  ${formatarSub(cadastro.sub)}  |  Nº ${cadastro.numero}  |  Posição: ${cadastro.posicao}`,
    `🎵 Música: ${cadastro.musica}`,
    `📱 Instagram: ${formatarInstagram(cadastro.instagram)}`,
    "",
    `Responsável: ${cadastro.responsavel_nome}`,
  ];

  return linhas.join("\n");
}

export function montarLinkWhatsApp(mensagem: string, numero = FELIPE_WHATSAPP) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function linkWhatsAppDoCadastro(cadastro: Cadastro) {
  const mensagem = montarMensagemWhatsApp({
    ...cadastro,
    musica: cadastro.musica || "Escolha do editor",
  });
  return montarLinkWhatsApp(mensagem);
}
