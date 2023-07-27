import Router from "@koa/router";
import { createShortURL, getURLs, updateURL, deleteURL } from "../services/urls";

const urlsRouter = new Router();

urlsRouter.get("/", async ctx => {
    ctx.response.body = await getURLs(
        ctx.state.user_id,
        Number(ctx.request.query.limit),
        Number(ctx.request.query.offset)
    );
});

urlsRouter.post("/", async ctx => {
    ctx.response.body = await createShortURL(
        ctx.request.body as any,
        ctx.state.user_id
    );
});

urlsRouter.put("/:id", async ctx => {
    ctx.response.body = await updateURL(
        ctx.params.id,
        ctx.request.body as any,
        ctx.state.user_id
    )
});

urlsRouter.delete("/:id", async ctx => {
    ctx.response.body = await deleteURL(
        ctx.params.id,
        ctx.state.user_id
    );
});

export default urlsRouter;