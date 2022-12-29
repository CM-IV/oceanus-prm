import { z } from "zod";

//Register Forms
const authRegisterFormData = z.object({
    id: z.string().optional(),
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["confirmPassword"]
        })
    }
});

export type authRegisterFormData = z.infer<typeof authRegisterFormData>;

export async function handleAuthRegister(rawData: unknown) {
    const result = authRegisterFormData.safeParse(rawData);

    return result;
}
//Register Forms

//Login Forms
const authLoginFormData = z.object({
    id: z.string().optional(),
    username: z.string(),
    password: z.string()
});

export type authLoginFormData = z.infer<typeof authLoginFormData>;

export async function handleAuthLogin(rawData: unknown) {
    const result = authLoginFormData.safeParse(rawData);

    return result;
}
//Login Forms

//Contact CRUD Forms
//TODO
//Contact CRUD Forms