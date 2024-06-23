import { withClerkMiddleware } from "@clerk/nextjs";
import { WithClerkMiddleware} from "@clerk/nextjs/server";

export default withClerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};