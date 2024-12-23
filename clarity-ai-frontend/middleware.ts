import {
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isAllowedRoute = createRouteMatcher(["/", "/sign-in"]);

export default convexAuthNextjsMiddleware(
	async (request, { convexAuth }) => {
		if (isAllowedRoute(request) && (await convexAuth.isAuthenticated())) {
			return nextjsMiddlewareRedirect(request, "/dashboard");
		}
		if (!isAllowedRoute(request) && (await !convexAuth.isAuthenticated())) {
			return nextjsMiddlewareRedirect(request, "/sign-in");
		}
	},
	{
		cookieConfig: {
			maxAge: 60 * 60 * 24 * 30,
		},
	}
);

export const config = {
	// The following matcher runs middleware on all routes
	// except static assets and specified public routes.
	matcher: ["/((?!.*\\..*|_next|sign-in|sign-up).*)", "/(api|trpc)(.*)"],
};
