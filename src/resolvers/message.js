import uuidv4 from 'uuid/v4';

export default {
    Query: {
        messages: async (parent, args, {models}) => {
            return await models.Message.find();
          },
        message: async (parent, { id }, {models}) => {
            return await models.Message.findById(id);
          },
    },
    // Overidding User Query resolver
    

   
    Message: {
        user: async (message, args, {models})=>{
            return await models.User.findById(message.userId);
        }
    },

    Mutation: {
        createMessage: (parent, {text}, {me, models})=>{
            //const id = uuidv4();
            const message = models.Message.create({
                text,
                userId: me.id,
            });
          
            //models.messages[id] = message;
            //models.users[me.id].messageIds.push(id);
            return message;
        },
        deleteMessage: async (parent, { id }, {models}) => {
            //const { [id]: message, ...otherMessages } = models.messages;
            const message = await models.Message.findById(id);
      
            if (!message) {
              return false;
            } else{
                await message.remove();
                return true;
            }
      
            
          },
    }

}