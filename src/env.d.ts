type Contact = {
	id: string;
  	user_id: string;
  	name: string;
  	date_of_birth?: string;
  	workplace?: string;
  	phone?: string;
  	email?: string;  
  	notes?: string;
	thumbnail?: string; 
}

declare namespace Lucia {
	type Auth = import("../prisma/init").Auth;
	type UserAttributes = {
		username: string;
	};
}