/* @flow */
/* eslint-disable arrow-body-style */

import { graphql } from 'graphql-compose';
import type { TypeComposer } from 'graphql-compose';
import GraphQLConnectionCursor from './cursorType';

import PageInfoType from './pageInfoType';

const { GraphQLInt, GraphQLObjectType, GraphQLNonNull, GraphQLList } = graphql;

const cachedConnectionTypes = new WeakMap();
const cachedEdgeTypes = new WeakMap();

export function prepareEdgeType(typeComposer: TypeComposer): GraphQLObjectType {
  const name = `${typeComposer.getTypeName()}Edge`;
  const type = typeComposer.getType();

  if (cachedEdgeTypes.has(type)) {
    return (cachedEdgeTypes.get(type): any);
  }

  const edgeType = new GraphQLObjectType({
    name,
    description: 'An edge in a connection.',
    fields: () => ({
      node: {
        type: typeComposer.getType(),
        description: 'The item at the end of the edge',
      },
      cursor: {
        type: new GraphQLNonNull(GraphQLConnectionCursor),
        description: 'A cursor for use in pagination',
      },
    }),
  });

  // This is small HACK for providing to graphql-compose/src/projection.js
  // information about required fields in projection and relations
  // $FlowFixMe
  edgeType.ofType = type;

  cachedEdgeTypes.set(type, edgeType);
  return edgeType;
}

export function prepareConnectionType(typeComposer: TypeComposer): GraphQLObjectType {
  const name = `${typeComposer.getTypeName()}Connection`;
  const type = typeComposer.getType();

  if (cachedConnectionTypes.has(type)) {
    return (cachedConnectionTypes.get(type): any);
  }

  const connectionType = new GraphQLObjectType({
    name,
    description: 'A connection to a list of items.',
    fields: () => ({
      count: {
        type: GraphQLInt,
        description: 'Total object count.',
      },
      pageInfo: {
        type: new GraphQLNonNull(PageInfoType),
        description: 'Information to aid in pagination.',
      },
      edges: {
        type: new GraphQLList(prepareEdgeType(typeComposer)),
        description: 'Information to aid in pagination.',
      },
    }),
  });

  // This is small HACK for providing to graphql-compose/src/projection.js
  // information about required fields in projection and relations
  // $FlowFixMe
  connectionType.ofType = type;

  cachedConnectionTypes.set(type, connectionType);
  return connectionType;
}
