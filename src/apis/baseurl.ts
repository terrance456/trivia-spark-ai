import { ApiRoutes } from "./routes.enum";

export const generateBaseUrl = (path: ApiRoutes) => {
  return process.env.NEXT_PUBLIC_CLIENT_APIURL + path;
};
