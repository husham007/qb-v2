import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import models from './models';
import uuidv4 from 'uuid/v4';


const app = express();
app.use(cors());



  //const me = users[1];




const server = new ApolloServer({

    typeDefs: schema,
    resolvers,
    context: {
        models,
        me:  models.users[1],
    }
   
});

server.applyMiddleware({
    app,
    path: '/graphql'
});

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });

console.log('Hello Node.js project.');

console.log(process.env.MY_SECRET);