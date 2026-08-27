"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_MAX_AGE, ADMIN_COOKIE_NAME, criarSessionToken } from "@/lib/auth";
import { supabaseAdmin, type StatusCadastro } from "@/lib/supabase";

export interface LoginState {
  status: "idle" | "error";
  message?: string;
}

export async function loginAdmin(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const senha = String(formData.get("senha") ?? "");
  const senhaCorreta = process.env.ADMIN_PASSWORD;

  if (!senhaCorreta) {
    return {
      status: "error",
      message: "ADMIN_PASSWORD não configurado no servidor.",
    };
  }

  if (senha !== senhaCorreta) {
    return { status: "error", message: "Senha incorreta." };
  }

  const token = await criarSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  });

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin");
}

export async function atualizarStatusCadastro(
  id: string,
  status: StatusCadastro
) {
  const { error } = await supabaseAdmin
    .from("cadastros")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error("Não foi possível atualizar o status.");
  }

  revalidatePath(`/admin/cadastro/${id}`);
  revalidatePath("/admin/dashboard");
}

export async function excluirCadastro(id: string) {
  const { error } = await supabaseAdmin.from("cadastros").delete().eq("id", id);

  if (error) {
    throw new Error("Não foi possível excluir o cadastro.");
  }

  revalidatePath("/admin/dashboard");
}
