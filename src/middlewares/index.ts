import { RouterContext } from "@koa/router";
import { Next } from "koa";
import httpError from "http-errors";
import { verifyToken } from "../config/jwt";

export const requireAuthHandler = async (ctx: RouterContext, next: Next) => {
    const header = ctx.request.headers.authorization;
    if(!header) {
        throw new httpError.Unauthorized("You are not authorized to access this resource");
    }

    const token = header.split(" ")[1];
    const tokenPayload = verifyToken(token);
    ctx.state.user_id = tokenPayload.id;
    await next();
};