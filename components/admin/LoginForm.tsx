"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin, type LoginState } from "@/app/admin/actions";

const estadoInicial: LoginState = { status: "idle" };

function BotaoEntrar() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-gold px-6 py-3 text-base font-bold text-black transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAdmin, estadoInicial);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-muted">Senha</span>
        <input
          name="senha"
          type="password"
          required
          autoFocus
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
        />
      </label>

      {state.status === "error" && (
        <p className="rounded-lg border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      )}

      <BotaoEntrar />
    </form>
  );
}
