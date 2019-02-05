import 'reflect-metadata';
import {
  RESOLVER_DELEGATE_METADATA,
  RESOLVER_NAME_METADATA,
  RESOLVER_PREFIX_METADATA,
  RESOLVER_PROPERTY_METADATA,
  RESOLVER_TYPE_METADATA,
} from '../graphql.constants';
import { ResolverMetadata } from '../interfaces/resolver-metadata.interface';

export function extractMetadata(
  instance: Object,
  prototype: any,
  methodName: string,
  filterPredicate: (
    resolverType: string,
    isDelegated: boolean,
    isPropertyResolver?: boolean,
  ) => boolean,
): ResolverMetadata {
  const callback = prototype[methodName];
  const resolverType =
    Reflect.getMetadata(RESOLVER_TYPE_METADATA, callback) ||
    Reflect.getMetadata(RESOLVER_TYPE_METADATA, instance.constructor);

  const isPropertyResolver = Reflect.getMetadata(
    RESOLVER_PROPERTY_METADATA,
    callback,
  );
  const resolverName = Reflect.getMetadata(RESOLVER_NAME_METADATA, callback);
  const resolverPrefix = Reflect.getMetadata(RESOLVER_PREFIX_METADATA, instance.constructor);
  const isDelegated = !!Reflect.getMetadata(
    RESOLVER_DELEGATE_METADATA,
    callback,
  );
  if (filterPredicate(resolverType, isDelegated, isPropertyResolver)) {
    return null;
  }
  return {
    name: resolverName || (resolverPrefix ? `${resolverPrefix}${methodName}` : methodName),
    type: resolverType,
    methodName,
  };
}
