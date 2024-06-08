import { NextRequest, NextResponse } from "next/server";
import { GET_USER } from "services/apiUrl";

export default async function middleware(request: NextRequest) {
  const pathname = request?.nextUrl?.pathname;
  console.log({ pathname });

  const response = NextResponse.next();
  const token = request?.cookies?.get("token")?.value
    ? request?.cookies?.get("token")?.value ?? ""
    : null;

  let res = null;

  if (token) {
    res = await fetch(`${GET_USER}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  const user = (await res?.json())?.data as any;
  const expiryTime = request?.cookies?.get("expiryTime")?.value;

  const unprotectedURLs = ["/login", "/register", "/"];

  const isUnprotectedURLs = unprotectedURLs.includes(pathname);

  if (!isUnprotectedURLs && expiryTime) {
    const today = new Date();
    const exp = new Date(expiryTime);

    if (exp < today) {
      return NextResponse.redirect(new URL("/login", request?.url));
    }
  }

  console.log({ user });

  if (user) {
    if (user?.onboarding === 1 && pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", request?.url));
    }

    if (
      user?.onboarding === 2 &&
      !pathname.includes("/onboarding/subscription")
    ) {
      return NextResponse.redirect(
        new URL("/onboarding/subscription", request?.url)
      );
    }

    // console.log({ user });

    if (user?.onboarding >= 3 && pathname.includes("/onboarding")) {
      return NextResponse.redirect(new URL("/dashboard", request?.url));
    }
  } else {
    if (!isUnprotectedURLs)
      return NextResponse.redirect(new URL("/login", request?.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
