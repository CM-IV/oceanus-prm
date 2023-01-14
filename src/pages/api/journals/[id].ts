import type { APIContext, APIRoute } from "astro";
import { db } from "../../../../prisma/init";
import { AuthRequest } from "@lucia-auth/astro";
import { auth } from "@prisma/init";

export const put: APIRoute = async (ctx: APIContext) => {

    try {

        const authRequest = new AuthRequest(auth, ctx);
        const { user } = await authRequest.validateUser();

        if (!user) {
            return new Response(null, {
                status: 401,
                statusText: "Unauthorized"
            });
        }

        const id = ctx.params.id as string;
        const body = await ctx.request.json();

        await db.journal.update({
            where: {
                id: parseInt(id)
            },
            data: {
                user_id: user.userId,
                ...body
            },
        })


        return new Response(null, {
            status: 204,
            statusText: "Created Successfully"
        })
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const del: APIRoute = async (ctx: APIContext) => {

    try {
        const authRequest = new AuthRequest(auth, ctx);
        const { user } = await authRequest.validateUser();

        if (!user) {
            return new Response(null, {
                status: 401,
                statusText: "Unauthorized"
            });
        }

        const id = ctx.params.id as string;

        await db.journal.delete({
            where: {
                id: parseInt(id)
            }
        })


        return new Response(null, {
            status: 200,
            statusText: "Deleted Successfully"
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

        const id = ctx.params.id as string;

        const contact = await db.journal.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        return new Response(JSON.stringify(contact), {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
        });

    } catch (error) {
        console.log(error);
        throw error;
    }

}