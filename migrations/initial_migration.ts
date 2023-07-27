import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // create tables, columns, etc.
    await knex.schema.createTableIfNotExists("users", table => {
        table.increments("id").primary();
        table.string("username").notNullable().unique();
        table.text("password").notNullable();
        table.timestamps(true, true);
        // table.timestamps(true, true) is shortcut for:
        // table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
        // table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
    }).createTableIfNotExists("urls", table => {
        table.string("id")
            .defaultTo(knex.raw("substring(md5(random()::text) from 0 for 7)"))
            .primary();
        table.text("url").notNullable();
        table.integer("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .notNullable();
        table.timestamps(true, true);
    }).createTableIfNotExists("visits", table => {
        table.increments("id").primary();
        table.string("url_id")
            .references("id")
            .inTable("urls")
            .onDelete("CASCADE")
            .notNullable();
        table.string("ip").notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    // drop tables, columns, etc.
    await knex.schema.dropTableIfExists("visits")
        .dropTableIfExists("urls")
        .dropTableIfExists("users");
}
