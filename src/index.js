import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import compression from 'compression';
import http from 'http';
import dotenv from 'dotenv';
import { expressjwt } from "express-jwt";
dotenv.config()
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Authorization } from './modules/Auth/authorization.js';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import initApi from './initApi.js';

const apiModules = await initApi();
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