import knex from "../config/knex";
import { validateRegister, validateLogin } from "./validations";
import httpError from "http-errors";
import { hashPassword, comparePassword } from "../config/encryption";
import { generateToken } from "../config/jwt";

const getUser = async (username: string) =>
    knex("users")
        .whereRaw("LOWER(username) = LOWER(?)", username)
        .first();

export const register = async (body: { username: string, password: string }) => {
    validateRegister(body);
    const curr_user = await getUser(body.username);
    if (curr_user) {
        throw new httpError.Conflict("Username already exists");
    }
    return (await knex("users").insert(
        { username: body.username.toLowerCase(), password: await hashPassword(body.password) },
        ["id", "username"]
    ))[0];
}

export const login = async (body: { username: string, password: string }) => {
    validateLogin(body);
    const user = await getUser(body.username);
    if (!user) {
        throw new httpError.Unauthorized("User or password is incorrect");
    }
    const match = await comparePassword(body.password, user.password);
    if (!match) {
        throw new httpError.Unauthorized("User or password is incorrect");
    }
    const token = generateToken({ id: user.id });
    return {
        user: {
            id: user.id,
            username: user.username,
            created_at: user.created_at,
            updated_at: user.updated_at
        },
        token
    };
}