"use client";

import { useActionState } from "react";
import { loginAction, type AuthActionState } from "@/app/admin/actions";

const initialState: AuthActionState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form className="admin-form" action={formAction}>
      <label>
        E-mail
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Senha
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <button className="button-primary" type="submit" disabled={isPending}>
        {isPending ? "Entrando..." : "Entrar"}
      </button>
      {state.error ? <p className="admin-error" role="alert">{state.error}</p> : null}
    </form>
  );
}
