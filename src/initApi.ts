import knex from "knex";
import pkg from 'pg';
import EcosystemDatabase from './modules/EcosystemDatabase.js';
import linkApiModules from "./modules/factory.js";
import defaultSettings from "./modules/default.config.js";
import { ModulesConfig } from "./modules/ModulesConfig.js";

const { types } = pkg;
types.setTypeParser(1082, val => val);

export default async (settings:ModulesConfig = defaultSettings) => {
    const knexConfig = {
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING,
    };

    const db = new EcosystemDatabase(knex(knexConfig));
    return await linkApiModules(db, settings);
};