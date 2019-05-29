import { gql } from 'apollo-server-express';

export default gql `
extend type Query {
    questions(cursor: String, limit: Int): QuestionPage!
    question(id: ID!): Question!
}

extend type Mutation {
    createQuestion(statement: String!, category: String!, type: String!, level: String!, answer: String!, options: [String]! ): Question!
    deleteQuestion(id: ID): Boolean!
}

type QuestionPage {
    questions: [Question!]!
    pageInfo: PageInformation! 
}

type PageInformation {
    hasNextPage : Boolean!
    endCursor: String!
}

type Question {
    id: ID!
    statement: String!
    category: String!
    type: String!
    level: String!
    answer: String!
    option: [String]!
}
`;