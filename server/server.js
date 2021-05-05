const express = require("express");
const { ApolloServer, UserInputError } = require("apollo-server-express"); // import apollo server object
const fs = require("fs");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

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

// scalar type resolver
const GraphQLDate = new GraphQLScalarType({
    name: "GraphQLDate",
    description: "A Date() type in graphQL as a scalar",
    //convert date to string
    serialize(value) {
        return value.toISOString();
    },

    // convert strings to proper dates
    parseLiteral(ast) {
        if (ast.kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue; // catch invalid date strings
    },
});

// handler functions to resolve queries with real values
const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList, // resolver function for the Issues
    },
    Mutation: {
        setAboutMessage,
        issueAdd,
    },
    GraphQLDate,
};

function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
}

function issueList() {
    return issuesDB;
}

// issueAdd resolver to create new Issue in memory
function issueAdd(_, { issue }) {
    const errors = [];
    if (issue.title.length < 3) {
        errors.push('Field "title" must be at least 3 characters long.');
    }
    if (issue.status == "Assigned" && !issue.owner) {
        errors.push('Field "owner" is required when status is "Assigned"');
    }
    if (errors.length > 0) {
        throw new UserInputError("Invalid input(s)", { errors });
    }
    issue.created = new Date();
    issue.id = issuesDB.length + 1;
    issuesDB.push(issue);
    return issue;
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