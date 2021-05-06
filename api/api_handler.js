const fs = require("fs")
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')

const GraphQLDate = require('./graphql_date')
const about = require('./about.js')
const issue = require('./issue.js');

// handler functions to resolve queries with real values
const resolvers = {
    Query: {
        about: about.getMessage,
        issueList: issue.list, // resolver function for the Issues
    },
    Mutation: {
        setAboutMessage: about.setMessage,
        issueAdd: issue.add,
    },
    GraphQLDate,
};

// construction of apollo server with two properties and return a GraphQL server object
const server = new ApolloServer({
    typeDefs: fs.readFileSync("schema.graphql", "utf-8"), // changes schema into string
    resolvers,
});

function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    console.log('CORS setting:', enableCors);
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}
module.exports = { installHandler };