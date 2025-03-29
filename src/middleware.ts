import { getSessionPayload } from "@/utils/session";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/signin", "/signup"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);
  const payload = await getSessionPayload();

  if (isPublicRoute) {
    if (payload) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } else {
    if (!payload) {
      return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    const isAdminRoute = pathname.match(/\/admin.*/);
    const isAdminUser = payload && payload.user.role === "ADMIN";

    if (isAdminRoute && !isAdminUser) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
