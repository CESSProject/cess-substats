import { request } from "@/utils";

export default function login(data) {
	return request.post("/user/authentication/login", { data });
}
