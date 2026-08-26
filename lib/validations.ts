import { z } from "zod";

export const cadastroSchema = z.object({
  confronto: z.string().trim().min(1, "Informe o confronto"),
  data_jogo: z.string().trim().min(1, "Informe a data do jogo"),
  horario: z.string().trim().min(1, "Informe o horário"),
  local: z.string().trim().min(1, "Informe o local"),
  atleta_nome: z.string().trim().min(1, "Informe o nome do atleta"),
  time_atleta: z.string().trim().min(1, "Informe o time"),
  sub: z.string().trim().min(1, "Informe a categoria (sub)"),
  numero: z.string().trim().min(1, "Informe o número da camisa"),
  posicao: z.string().trim().min(1, "Informe a posição"),
  musica: z.string().trim().optional(),
  instagram: z.string().trim().min(1, "Informe o Instagram"),
  responsavel_nome: z.string().trim().min(1, "Informe o nome do responsável"),
});

export type CadastroInput = z.infer<typeof cadastroSchema>;

export const statusLabels: Record<string, string> = {
  nova: "Nova",
  em_captacao: "Em captação",
  em_edicao: "Em edição",
  entregue: "Entregue",
};

export const statusOptions = Object.keys(statusLabels) as Array<
  keyof typeof statusLabels
>;
