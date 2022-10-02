import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import compression from 'compression';
import http from 'http';
import dotenv from 'dotenv';
import pkg from 'pg';
import { expressjwt } from "express-jwt";
dotenv.config()
import { makeExecutableSchema } from '@graphql-tools/schema';
import linkApiModules from './modules/factory.js';
import EcosystemDatabase from './modules/EcosystemDatabase.js';
import { Authorization } from './modules/Auth/authorization.js';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

const { types } = pkg
types.setTypeParser(1082, val => val);

const knexConfig = {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
};

const db = new EcosystemDatabase(knexConfig);
const apiModules = await linkApiModules(db);

const schema = makeExecutableSchema({ 
    typeDefs: apiModules.typeDefs,
    resolvers: apiModules.resolvers 
});

const options = {
    port: process.env.PORT || 4000
}

async function startApolloServer() {
    const app = express();
    
    app.use(compression())
    app.use(
        expressjwt({
            secret: process.env.SECRET,
            algorithms: ['HS256'],
            credentialsRequired: false
        })
    )
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), responseCachePlugin.default() ],
        context: ({ req }) => {
            try {
                const user = req.auth || null;
                if (user) {
                    const auth = new Authorization(apiModules.datasource, user.id)
                    return { user, auth }
                } else {
                    return null;
                }
            } catch (error) {
                throw new AuthenticationError(error.message)
            }

        },
        dataSources: () => ({ db: apiModules.datasource })
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen(options, resolve));
    console.log(`Server ready at http://localhost:${options.port}${server.graphqlPath}`)
};

startApolloServer(schema)