import { gql } from 'apollo-server-express';

export default gql `
extend type Query {
    questions(cursor: String, limit: Int): QuestionPages!
    question(id: ID!): Question!
    searchQuestion (searchInput: SearchInput!): [Question]
}

extend type Mutation {
    createQuestion(statement: String!, category: String!, type: String!, level: String!, answer: String!, options: [String]! book: String!): Question!
    editQuestion(id: ID!, statement: String!, category: String!, type: String!, level: String!, answer: String!, options: [String]! book: String!): Question!
    deleteQuestion(id: ID!): Boolean!
    
}

type QuestionPages {
    page: [Question!]!
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
    author: User
    book: String!
}

input SearchInput {
    statement: String
    category: String
    type: String
    level: String
    answer: String
    option: [String]   
    book: String
}
`;