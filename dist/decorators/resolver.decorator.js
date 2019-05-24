"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const optional = require("optional");
const lazy_metadata_storage_1 = require("../storages/lazy-metadata.storage");
const resolvers_utils_1 = require("./resolvers.utils");
const { Resolver: TypeGqlResolver } = optional('type-graphql') || {};
function Resolver(nameOrType, options) {
    return (target, key, descriptor) => {
        const name = nameOrType && resolvers_utils_1.getClassName(nameOrType);
        resolvers_utils_1.addResolverMetadata(undefined, name, target, key, descriptor);
        if (!shared_utils_1.isString(nameOrType)) {
            TypeGqlResolver &&
                lazy_metadata_storage_1.lazyMetadataStorage.store(() => TypeGqlResolver(nameOrType, options)(target));
        }
    };
}
exports.Resolver = Resolver;
