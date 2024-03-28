const { auth } = require("./auth");

export default auth((req) => {
  const isLoggedin = !!req.auth;
  const { nextUrl } = req;
  const currentRoute = nextUrl.pathname;

  //   //
  const authRoutes = ["/login", "/signup"];
  const publicRoute = "/";
  const defaultRedirectRouteifAuthenticated = "/dashboard";
  const loginRoute = "/login";
  const apiPrefix = "/api";

  //   //

  if (nextUrl.pathname.startsWith(apiPrefix)) {
    return null;
  }

  if (authRoutes.includes(currentRoute)) {
    if (isLoggedin) {
      return Response.redirect(
        new URL(defaultRedirectRouteifAuthenticated, nextUrl)
      );
    }

    return null;
    //   return Response.redirect(new URL("/dashboard"), nextUrl);
  }
  if (currentRoute !== publicRoute) {
    // console.log(currentRoute);
    if (!isLoggedin) {
      return Response.redirect(new URL(loginRoute, nextUrl));
    }
    return null;
  }

  //   if (!isLoggedin && currentRoute !== publicRoute) {
  //     let callbackUrl = nextUrl.pathname;
  //     if (nextUrl.search) {
  //       callbackUrl += nextUrl.search;
  //     }

  //     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  //     return Response.redirect(
  //       new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
  //     );
  //   }
  return null;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
