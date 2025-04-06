import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// This ensures Clerk runs on all routes
export const config = {
  matcher: "/((?!_next|api|favicon.ico).*)",
};