const express = require("express");
const { ApolloServer } = require("apollo-server-express"); // import apollo server object
const fs = require("fs");

// hard-coded database
const issuesDB = [{
        id: 1,
        status: "New",
        owner: "Ravan",
        effort: 5,
        created: new Date("2019-01-15"),
        due: undefined,
        title: "Error in console when clicking Add",
    },
    {
        id: 2,
        status: "Assigned",
        owner: "Eddie",
        effort: 14,
        created: new Date("2019-01-16"),
        due: new Date("2019-02-01"),
        title: "Missing bottom border on panel",
    },
];

let aboutMessage = "Issue Tracker API v1.0";

// handler functions to resolve queries with real values
const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList, // resolver function for the Issues
    },
    Mutation: {
        setAboutMessage,
    },
};

function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
}

function issueList() {
    return issuesDB;
}

// construction of apollo server with two properties and return a GraphQL server object
const server = new ApolloServer({
    typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"), // changes schema into string
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