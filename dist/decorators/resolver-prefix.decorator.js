"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_constants_1 = require("../graphql.constants");
function ResolverPrefix(name) {
    return (target, key, descriptor) => {
        common_1.SetMetadata(graphql_constants_1.RESOLVER_PREFIX_METADATA, name)(target, key, descriptor);
    };
}
exports.ResolverPrefix = ResolverPrefix;
