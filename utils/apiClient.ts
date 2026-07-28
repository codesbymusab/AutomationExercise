import { APIRequestContext } from "@playwright/test";


export function get<T>(request: APIRequestContext, uri: string): Promise<T> {
  return request.get(`${process.env.BASE_URL}/api/${uri}`).then(async (res) => {
    if (!res.ok()) throw new Error(`Failed to fetch ${uri}: ${res.status()} ${res.statusText()}`);
    return res.json() as Promise<T>;
  });

}