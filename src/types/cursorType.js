/* @flow */

import { graphql } from 'graphql-compose';

const { GraphQLScalarType, Kind } = graphql;

const GraphQLConnectionCursor = new GraphQLScalarType({
  name: 'ConnectionCursor',
  description:
    'The `ConnectionCursor` is String type, that represents a point of record in data set. ' +
      ' Due this point, you may request previous or next records.',
  serialize: String,
  parseValue: String,
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? ast.value : null;
  },
});

export default GraphQLConnectionCursor;
