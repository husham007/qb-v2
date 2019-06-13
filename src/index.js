import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';
import jwt from 'jsonwebtoken';



const app = express();
app.use(cors());



//const me = users[1];

const getMe = async req => {
  const token = req.headers['x-token'];
  console.log('token', token);
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      console.log(e);
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};



const server = new ApolloServer({

  typeDefs: schema,
  resolvers,
  introspection: true, // enables introspection of the schema
    playground: true, // enables the actual playground
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      models,
      me,
      secret: process.env.SECRET,

    }
  }

});

server.applyMiddleware({
  app,
  path: '/graphql'
});

const isTest = !!process.env.TEST_DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8000;

app.listen({ port }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});

 

connectDb().then(async () => {
  if (isTest || isProduction) {
    // reset database
    await Promise.all([
    models.User.deleteMany({}),
    models.Message.deleteMany({}),
    models.Question.deleteMany({}),
    ]); 

    createUsersWithMessages(new Date());
    console.log('DB connected'); 
  }   
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

  

  

  const question3 = new models.Question({
    statement: 'What is programming',   
    category: 'general',
    type: 'short',
    level: 'easy',
    answer: 'answer',
    options: ['i', 'j', 'k', 'l'],
    author: user2.id,
    createdAt: date.setSeconds(date.getSeconds() + 1),
     
    
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await question3.save((err)=>{ 
    if (err) throw err;
  }); 

  await user1.save();
  await user2.save(); 
};

console.log('Hello Node.js project.');

console.log(process.env.SECRET);



