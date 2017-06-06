/* @flow */

import { TypeComposer } from 'graphql-compose';
import type { ComposeWithConnectionOpts } from './definition';
import { prepareConnectionResolver } from './connectionResolver';

export function composeWithConnection(
  typeComposer: TypeComposer,
  opts: ComposeWithConnectionOpts
): TypeComposer {
  if (!(typeComposer instanceof TypeComposer)) {
    throw new Error('You should provide TypeComposer instance to composeWithRelay method');
  }

  if (!opts) {
    throw new Error('You should provide non-empty options to composeWithConnection');
  }

  if (typeComposer.hasResolver('connection')) {
    return typeComposer;
  }

  const resolver = prepareConnectionResolver(typeComposer, opts);

  typeComposer.setResolver('connection', resolver);
  return typeComposer;
}
