import mongoose from 'mongoose';
import User from './user';
import Message from './message';


const connectDb = ()=>{
    return mongoose.connect(
        process.env.DATABASE_URL,
        { useNewUrlParser: true },
      );
    }  



let users = {
    1: {
      id: '1',
      username: 'Muhammad Husham Yousaf',
      school: 'INTEGRIFY',
      messageIds: [1],
    },
    2: {
      id: '2',
      username: 'Aylin',
      school: 'None',
      messageIds: [2],
    },
  };
  
  let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  }; 

  export { connectDb };
  const models = {User, Message};

  export default models;