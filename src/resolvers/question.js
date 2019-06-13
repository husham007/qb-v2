import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';
import message from './message';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

  export default {
      Query: {
          questions: async (parent, {cursor, limit = 10}, {models}) => {
              const cursorOptions = cursor ? {
                  createdAt: {
                      $lt: fromCursorHash(cursor),
                  },
              }
              : {};
              const questions = await models.Question.find(cursorOptions, null, {
                  sort: { createdAt: -1},
                  limit: limit + 1,
              });

              const hasNextPage = questions.length > limit;
              const questions = hasNextpage ? questions.slice(0,1): questions;

              return {
                  questions, 
                  pageInfo: {
                      hasNextPage,
                      endCursor: toCursorHash(pages[pages.length - 1].createdAt.toString(),
                      ),
                  },
              };
          },
          question: async (parent, {id}, {models})=>{
              return await models.Question.findById(id);
          },
      },

      Question: {
          user: async (question, args, {models})=>{
              return await models.User.findById(    question.author)
          }
      },

      Mutation: {
          createQuestion: combineResolvers (
              isAuthenticated, (parent, {statement, category, type, level, answer, options}, {me, models}) => {
                  const question = models.Question.create({
                      statement, category, type, level, answer, options, author: me.id,
                  });
                  return question;
              } 
          ),

          editQuestion: (parent, {id, statement, category, type, level, answer, options}, {me, models}) => {

            const q = await models.Question.findById(id);

            if (!question){
                return false;
              }
              else {
                q.statement = statement;
                q.category = category;
                q.type = type;
                q.level = level;
                q.answer = answer;
                q.options = options;
                await question.save();
                return q;
              }

                
                
            } 
        ,

          deleteQuestion: combineResolvers (isAuthenticated, isMessageOwner, async (parent, {id}, {models})=>{
              const question = await models.Question.findById(id);

              if (!question){
                return false;
              }
              else {
                  await question.remove();
                  return true;
              }
          }),
      }
  }