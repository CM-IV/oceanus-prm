import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import lucia from 'lucia-auth';

export const db = new PrismaClient();

export const auth = lucia({
	adapter: prisma(db),
    env: import.meta.env.DEV ? "DEV" : "PROD",
    transformUserData: (userData) => {
		return {
			userId: userData.id,
			username: userData.username		
		};
	},
	sessionTimeout: {
		activePeriod: 7200000,
		idlePeriod: 3600000
	}
});

export type Auth = typeof auth;