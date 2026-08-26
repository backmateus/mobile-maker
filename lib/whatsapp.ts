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
  musica?: string | null;
  instagram: string;
  responsavel_nome: string;
}) {
  const linhas = [
    "📋 NOVO CADASTRO — Mobile Maker",
    "",
    `⚽ Confronto: ${cadastro.confronto}`,
    `📅 Data: ${formatarData(cadastro.data_jogo)} às ${cadastro.horario}`,
    `📍 Local: ${cadastro.local}`,
    "",
    `👤 Atleta: ${cadastro.atleta_nome}`,
    `🏳️ Time: ${cadastro.time_atleta}  |  ${cadastro.sub}  |  Nº ${cadastro.numero}  |  Posição: ${cadastro.posicao}`,
  ];

  if (cadastro.musica && cadastro.musica.trim()) {
    linhas.push(`🎵 Música: ${cadastro.musica.trim()}`);
  }

  linhas.push(
    `📱 Instagram: ${formatarInstagram(cadastro.instagram)}`,
    "",
    `Responsável: ${cadastro.responsavel_nome}`
  );

  return linhas.join("\n");
}

export function montarLinkWhatsApp(mensagem: string, numero = FELIPE_WHATSAPP) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function linkWhatsAppDoCadastro(cadastro: Cadastro) {
  const mensagem = montarMensagemWhatsApp(cadastro);
  return montarLinkWhatsApp(mensagem);
}
