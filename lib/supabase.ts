import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY precisam estar configurados no .env.local"
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

export type StatusCadastro =
  | "nova"
  | "em_captacao"
  | "em_edicao"
  | "entregue";

export interface Cadastro {
  id: string;
  created_at: string;
  status: StatusCadastro;
  confronto: string;
  data_jogo: string;
  horario: string;
  local: string;
  atleta_nome: string;
  time_atleta: string;
  sub: string;
  numero: string;
  posicao: string;
  musica: string | null;
  instagram: string;
  responsavel_nome: string;
}
