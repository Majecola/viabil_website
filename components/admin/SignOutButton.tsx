import { logoutAction } from "@/app/admin/actions";

export function SignOutButton() {
  return (
    <form action={logoutAction}>
      <button className="admin-link-button" type="submit">
        Sair
      </button>
    </form>
  );
}
