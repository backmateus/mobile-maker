import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verificarSessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const valido = await verificarSessionToken(token);

  if (!valido) {
    const loginUrl = new URL("/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/cadastro/:path*"],
};
