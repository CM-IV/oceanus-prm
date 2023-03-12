import type { APIContext, APIRoute } from "astro";
import { db } from "@prisma/init";
import { AuthRequest } from "@lucia-auth/astro";
import { auth } from "@prisma/init";

export const post: APIRoute = async (ctx: APIContext) => {
    try {

        const authRequest = new AuthRequest(auth, ctx);
        const { user } = await authRequest.validateUser();

        if (!user) {
            return new Response(null, {
                status: 401,
                statusText: "Unauthorized"
            });
        }

        const body = await ctx.request.json();

        await db.journal.create({
            data: { 
                user_id: user.userId,
                ...body
            }
        });

        return new Response(null, {
            status: 201,
            statusText: "Journal Entry Created Successfully"
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const get: APIRoute = async (ctx: APIContext) => {
    try {

        const authRequest = new AuthRequest(auth, ctx);
        const { user } = await authRequest.validateUser();

        if (!user) {
            return new Response(null, {
                status: 401,
                statusText: "Unauthorized"
            });
        }

        const journalEntries = await db.journal.findMany();

        const filteredEntries = journalEntries.filter((o: Journal) => o.user_id === user.userId).reverse();

        return new Response(JSON.stringify(filteredEntries), {
            status: 200,
            statusText: "Fetched Successfully"
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}