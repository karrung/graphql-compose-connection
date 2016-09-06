/* @flow */

import { GraphQLScalarType, Kind } from 'graphql';

const GraphQLConnectionCursor = new GraphQLScalarType({
  name: 'ConnectionCursor',
  description:
    'The `ConnectionCursor` is String type, that represents a point of record in data set. ' +
    ' Due this point, you may request previous or next records.',
  serialize: String,
  parseValue: String,
  parseLiteral(ast) {
    // $FlowFixMe
    return ast.kind === Kind.STRING ? ast.value : null;
  },
});

export default GraphQLConnectionCursor;
