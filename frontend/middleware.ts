// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "auth_token";

// Rotas que não precisam de login (app/(public))
const PUBLIC_ROUTES: string[] = [
  "/",          // ex: landing page pública
  "/login",
  "/register",
  "/forgot-password",
  "/auth/callback",
  "/auth/error",
];

const AUTH_PAGES = ["/login", "/register", "/forgot-password"];

function isPublicRoute(pathname: string) {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith("/auth/")) return true;
  return false;
}

function isAuthPage(pathname: string) {
  return AUTH_PAGES.includes(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar rotas técnicas/estáticas
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const isLoggedIn = !!token;

  // 1) Não logado tentando acessar rota privada
  if (!isLoggedIn && !isPublicRoute(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2) Logado tentando acessar página de login/register
  if (isLoggedIn && isAuthPage(pathname)) {
    const dashboardUrl = new URL("/dashboard", request.url); // ajuste se sua rota privada principal for outra
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Matcher bem simples (evita o erro de regex)
export const config = {
  matcher: ["/:path*"],
};
