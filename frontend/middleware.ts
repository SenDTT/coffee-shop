import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Convert secret to Uint8Array
const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    // Verify and decode JWT token
    const { payload } = await jwtVerify(token, secret);

    const userRole = payload.role; // assume role is stored in the token payload

    if (req.nextUrl.pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
  } catch (err) {
    // Token invalid or expired, redirect to login
    return NextResponse.redirect(new URL("/auth/logout", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
