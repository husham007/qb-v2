import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isQuestionOwner } from './authorization';


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
              let page = await models.Question.find(cursorOptions, null, {
                  sort: { createdAt: -1},
                  limit: limit + 1,
              });

              const hasNextPage = page.length > limit;
              const questions = hasNextPage ? page.slice(0,-1): page;
             
              return {
                  page: questions, 
                  pageInfo: {
                      hasNextPage,
                      endCursor: toCursorHash(questions[questions.length - 1].createdAt.toString(),
                      ),
                  },
              };
          },
          question: async (parent, {id}, {models})=>{
              return await models.Question.findById(id);
          },
      },

      Question: {
          author: async (question, args, {models})=>{
              return await models.User.findById(question.author)
          }
      },

      Mutation: {
          createQuestion: combineResolvers (
              isAuthenticated, (parent, {statement, category, type, level, answer, options, book}, {me, models}) => {
                  const question = models.Question.create({
                      statement, category, type, level, answer, options, book, author: null,
                  });
                  return question;
              } 
          ),

          editQuestion: async (parent, {id, statement, category, type, level, answer, options, book}, {me, models}) => {

            const q = await models.Question.findById(id);

            if (!q){
                return false;
              }
              else {
                q.statement = statement;
                q.category = category;
                q.type = type;
                q.level = level;
                q.answer = answer;
                q.options = options;
                q.book = book;
                await q.save();
                return q;
              }

                
                
            } 
        ,

          deleteQuestion: combineResolvers (isAuthenticated, isQuestionOwner, async (parent, {id}, {models})=>{
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