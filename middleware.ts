import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    const { role } = req.nextauth.token?.user as any;
    const validRoles = ["admin", "super-user", "seo"];

    if (!validRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
