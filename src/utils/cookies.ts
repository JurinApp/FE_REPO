import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (type: string, token: string | null) => {
	const expiration = new Date(Date.now() + 3600 * 1000);
	const refreshExpiration = new Date(Date.now() + 3600 * 24000 * 7);
	if (type === "accessToken") {
		cookies.set(type, token, {
			path: "/",
			secure: true,
			expires: expiration,
		});
	}

	if (type === "refreshToken") {
		cookies.set(type, token, {
			path: "/",
			secure: true,
			expires: refreshExpiration,
		});
	}
};

export const getCookie = (id: string) => {
	return cookies.get(id);
};

export const removeCookie = () => {
	cookies.remove("accessToken");
	cookies.remove("refreshToken");
};
