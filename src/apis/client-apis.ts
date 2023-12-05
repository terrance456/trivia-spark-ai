import { nextFetch } from "./fetch";
import { ApiRoutes } from "./routes.enum";

export async function verifyApi(token: string) {
  return nextFetch(ApiRoutes.verify, { headers: { Authorization: "Bearer " + token }, credentials: "include" }, false);
}
