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

        await db.contact.create({
            data: { 
                user_id: user.userId,
                ...body
            }
        });

        return new Response(null, {
            status: 201,
            statusText: "Contact Created Successfully"
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

        const contacts = await db.contact.findMany();

        const filteredContacts = contacts.filter((o: Contact) => o.user_id === user.userId);

        return new Response(JSON.stringify(filteredContacts), {
            status: 200,
            statusText: "Fetched Successfully"
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}