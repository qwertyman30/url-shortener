import knex from "../config/knex";
import httpError from "http-errors";

export const registerVisit = async (url_id: string, ip: string) =>
    await knex("visits").insert({ url_id, ip });

export const getLastVisits = async (
    user_id: number,
    limit: number,
    offset: number
) =>
    await knex("visits")
        .join("urls", "urls.id", "visits.url_id")
        .select(["urls.id", "urls.url", "visits.ip", "visits.created_at"])
        .where({ user_id })
        .limit(limit)
        .offset(offset)
        .orderBy("visits.created_at", "desc");

export const getVisitsByURL = async (url_id: string,
    user_id: number,
    limit: number,
    offset: number
) => {
    const url = await knex("urls")
        .where({ id: url_id })
        .select("user_id")
        .first();
    if (!url) {
        throw new httpError.NotFound("URL not found");
    }
    if (url.user_id !== user_id) {
        throw new httpError.Unauthorized("You are not authorized to access this URL");
    }
    return await knex("visits")
        .where({ url_id })
        .limit(limit)
        .offset(offset)
        .orderBy("created_at", "desc");
}