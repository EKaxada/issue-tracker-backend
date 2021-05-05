const express = require("express");
const { ApolloServer } = require("apollo-server-express"); // import apollo server object

let aboutMessage = "Issue Tracker API v1.0";

// Schema definition using String literals
const typeDefs = `
    type Query {
        about: String!
    }
    type Mutation {
        setAboutMessage(message: String!): String
    }
`;

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
    typeDefs,
    resolvers,
});

const app = express();

// serve the public folder to the home route '/'
app.use("/", express.static("public"));

server.applyMiddleware({ app, path: "/graphql" }); // install apollo_server as middleware in express

// start application
app.listen(3000, () => {
    console.log("App started on port 3000");
});