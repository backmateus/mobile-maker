import { Resend } from "resend";
import type { CadastroInput } from "./validations";

export async function enviarEmailNovoCadastro(
  cadastro: CadastroInput,
  cadastroId: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.FELIPE_EMAIL;
  const remetente = process.env.RESEND_FROM_EMAIL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!apiKey || !destino || !remetente) {
    console.warn(
      "E-mail de aviso não enviado: RESEND_API_KEY, FELIPE_EMAIL ou RESEND_FROM_EMAIL não configurados."
    );
    return false;
  }

  const resend = new Resend(apiKey);
  const linkPainel = siteUrl
    ? `${siteUrl}/admin/cadastro/${cadastroId}`
    : undefined;

  try {
    await resend.emails.send({
      from: remetente,
      to: destino,
      subject: `Novo cadastro — ${cadastro.atleta_nome} (${cadastro.confronto})`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #171717;">
          <h2>📋 Novo cadastro recebido</h2>
          <p><strong>Atleta:</strong> ${cadastro.atleta_nome}</p>
          <p><strong>Confronto:</strong> ${cadastro.confronto}</p>
          <p><strong>Data:</strong> ${cadastro.data_jogo} às ${cadastro.horario}</p>
          <p><strong>Responsável:</strong> ${cadastro.responsavel_nome}</p>
          ${
            linkPainel
              ? `<p><a href="${linkPainel}">Ver no painel</a></p>`
              : ""
          }
          <p style="color: #666; font-size: 12px;">Este é um aviso de backup. O cadastro completo já está salvo no painel.</p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Falha ao enviar e-mail de aviso:", error);
    return false;
  }
}
