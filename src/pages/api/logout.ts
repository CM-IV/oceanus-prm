import { handleLogoutRequests } from "@lucia-auth/astro";
import { auth } from "@prisma/init";
import type { APIRoute } from "astro";

export const post: APIRoute = handleLogoutRequests(auth);