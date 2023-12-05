import { ApiRoutes } from "./routes.enum";
import { generateBaseUrl } from "./baseurl";

export const nextFetch = async (input: ApiRoutes, init: RequestInit = {}, cookie: boolean = true) => {
  let requestInit: RequestInit = { ...init };

  if (cookie) {
    const { cookies } = await import("next/headers");
    requestInit = { ...requestInit, headers: { Cookie: cookies().toString(), ...requestInit.headers } };
  }
  const res = await fetch(generateBaseUrl(input), requestInit);

  if (!res.ok) {
    throw res;
  }

  if (isJSONRes(res)) {
    return await res.json();
  }

  return res;
};

const isJSONRes = (res: Response) => {
  const contentType: string | null = res.headers.get("Content-type");
  return contentType && contentType.indexOf("application/json") > -1;
};
