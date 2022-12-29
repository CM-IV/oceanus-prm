/// <reference types="astro/client" />
/// <reference types="lucia-auth" />

type Contact = {
	id: string;
  	user_id: string;
  	name: string;
  	date_of_birth: string;
  	workplace: string;
  	phone: string;
  	email: string;  
  	notes: string;  
}

declare namespace Lucia {
	type Auth = import("../prisma/init").Auth;
	type UserAttributes = {
		username: string;
		// contacts: Contact[];
	};
}