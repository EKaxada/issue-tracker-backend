// scalar resolver

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

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

module.exports = GraphQLDate;