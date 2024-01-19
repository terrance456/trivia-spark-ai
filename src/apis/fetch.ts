import { generateBaseUrl } from "./baseurl";
import { ApiRoutes } from "./routes.enum";

export const nextFetch = async <T>(input: ApiRoutes, init: RequestInit = {}, cookie: boolean = true) => {
  let requestInit: RequestInit = { ...init };

  if (cookie) {
    const { cookies } = await import("next/headers");
    requestInit = { ...requestInit, headers: { Cookie: cookies().toString(), ...requestInit.headers } };
  }
  const res: Response = await fetch(generateBaseUrl(input), requestInit);
  let result: any = res;

  if (isJSONRes(res)) {
    result = await res.json();
  }

  if (!res.ok) {
    throw result as Response;
  }

  return result as T;
};

const isJSONRes = (res: Response) => {
  const contentType: string | null = res.headers.get("Content-type");
  return contentType && contentType.indexOf("application/json") > -1;
};
