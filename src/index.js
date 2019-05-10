import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import models, {connectDb} from './models';



const app = express();
app.use(cors());



  //const me = users[1];




const server = new ApolloServer({

    typeDefs: schema,
    resolvers,
    context: async () => ({
        models,
        me: await models.User.findByLogin('rwieruch'),
      }),
   
});

server.applyMiddleware({
    app,
    path: '/graphql'
});

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });

connectDb().then(()=>{
    console.log('connected to DB');
    createUsersWithMessages(new Date());
});
    


const createUsersWithMessages = async date => {
    const user1 = new models.User({
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      role: 'ADMIN',
    });
  
    const user2 = new models.User({
      username: 'ddavids',
      email: 'hello@david.com',
      password: 'ddavids',
    });
  
    const message1 = new models.Message({
      text: 'Published the Road to learn React',
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: user1.id,
    });
  
    const message2 = new models.Message({
      text: 'Happy to release ...',
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: user2.id,
    });
  
    const message3 = new models.Message({
      text: 'Published a complete ...',
      createdAt: date.setSeconds(date.getSeconds() + 1),
      userId: user2.id,
    });
  
    await message1.save();
    await message2.save();
    await message3.save();
  
    await user1.save();
    await user2.save();
  };

console.log('Hello Node.js project.');

console.log(process.env.MY_SECRET);