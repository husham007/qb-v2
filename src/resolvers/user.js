import uuidv4 from 'uuid/v4';

export default {
    Query: {
        me: (parent, args, {me})=>{
            return me;
        },
        user: (parent, {id}, {models})=>{
            return models.users[id];
        },
        users: (parent, args, {models})=>{
            return Object.values(models.users);
        },
       
    },
    // Overidding User Query resolver
    

    User: {
        messages: (user, args, {models})=>{
            return Object.values(models.messages).filter(message =>{
                 return message.userId === user.id;
            });
        }
    },   

}