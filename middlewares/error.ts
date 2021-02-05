import { Response, Status } from "https://deno.land/x/oak/mod.ts";

export default async (
  { response }: { response: Response },
  next: () => Promise<void>,
) => {
  try {
    await next();
  } catch (err) {
    console.log("error middle ware", err);
    response.status = 500;
    response.body = { msg: err.message };
  }
};
