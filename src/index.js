import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config()

import schema from './schema/schema.js';
import EcosystemDatabase from './datasource/index.js';

const { types } = pkg
types.setTypeParser(1082, val => val); 
const knexConfig = {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
};


const db = new EcosystemDatabase(knexConfig);

const options = {
    port: process.env.PORT || 4000
}

async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        dataSources: () => ({ db })
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen(options, resolve));
    console.log(`Server ready at http://localhost:${options.port}${server.graphqlPath}`)
};

startApolloServer(schema)