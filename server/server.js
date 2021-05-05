const express = require("express");
const { ApolloServer } = require("apollo-server-express"); // import apollo server object
const fs = require('fs');

let aboutMessage = "Issue Tracker API v1.0";

// handler functions to resolve queries with real values
const resolvers = {
    Query: {
        about: () => aboutMessage,
    },
    Mutation: {
        setAboutMessage,
    },
};

function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
}

// construction of apollo server with two properties and return a GraphQL server object
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'), // changes schema into string
    resolvers,
});

const app = express();

// serve the public folder to the home route '/'
app.use("/", express.static("public"));

// install apollo_server as middleware in express
server.applyMiddleware({ app, path: "/graphql" });

// start application
app.listen(3000, () => {
    console.log("App started on port 3000");
});