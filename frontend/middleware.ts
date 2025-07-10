import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT secret is not defined");

const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return redirectToLogin(req);
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const userRole = payload.role;

    if (pathname.startsWith("/admin") && userRole !== "admin") {
      return redirectToUnauthorized(req);
    }

    return NextResponse.next();
  } catch (error) {
    return redirectToLogout(req);
  }
}

function redirectToLogin(req: NextRequest) {
  return NextResponse.redirect(new URL("/auth/login", req.url));
}

function redirectToUnauthorized(req: NextRequest) {
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

function redirectToLogout(req: NextRequest) {
  return NextResponse.redirect(new URL("/auth/logout", req.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
