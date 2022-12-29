import { signOut } from "@lucia-auth/astro/client";

const Signout = () => {

    const handleSignOut = async () => {
		await signOut("/api/logout");
		window.location.replace("/login");
	};

    return (
        <button class="button is-danger" onClick={handleSignOut}>Sign out</button>
    )
}

export { Signout };