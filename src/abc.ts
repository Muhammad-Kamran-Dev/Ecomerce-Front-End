import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = ["/login"];

  if (isPublicPath.includes(pathname)) {
    return NextResponse.next();
  } else {
    if (
      request.cookies.get("token")?.value &&
      isValidToken(request.cookies.get("token")?.value as string)
    ) {
      return NextResponse.next();
    } else {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url.toString());
    }
  }
}

function isValidToken(token: string): boolean {
  return true;
}

export const config = {
  matcher: ["/", "/products/:path*", "/products", "/login"],
};
