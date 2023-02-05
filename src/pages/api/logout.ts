import { auth } from "@prisma/init";
import type { APIRoute } from "astro";
import { AuthRequest } from "@lucia-auth/astro";

export const post: APIRoute = async (Astro) => {
	const authRequest = new AuthRequest(auth, Astro);
	const session = await authRequest.validate();
	if (!session)
		return new Response(null, {
			status: 400
		});
	await auth.invalidateSession(session.sessionId); // invalidate current session
	authRequest.setSession(null); // delete cookie

	// redirect to login page
	return new Response(null, {
		status: 302,
		headers: {
			location: "/login"
		}
	});
};