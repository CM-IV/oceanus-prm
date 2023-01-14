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
	created_at: Date;
	updated_at: Date;
}

type Journal = {
	id: number;
	user_id: string;
	title?: string;
	date: string;
	entry: string;
}

declare namespace Lucia {
	type Auth = import("../prisma/init").Auth;
	type UserAttributes = {
		username: string;
	};
}