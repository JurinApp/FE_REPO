import { decode } from "js-base64";

export const decodeToken = (token: string) => {
	const payload = token.split(".")[1];
	const decodePayload = decode(payload);
	const payloadObj = JSON.parse(decodePayload);

	return payloadObj.user_role.name;
};
