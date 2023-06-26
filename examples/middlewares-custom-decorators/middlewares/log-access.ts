import type { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Service } from "typedi";
import type { Context } from "../context";
import { Logger } from "../logger";

@Service()
export class LogAccessMiddleware implements MiddlewareInterface<Context> {
  constructor(private readonly logger: Logger) {}

  async use({ context, info }: ResolverData<Context>, next: NextFn) {
    this.logger.log(
      `Logging access: ${context.currentUser.name} -> ${info.parentType.name}.${info.fieldName}`,
    );
    return next();
  }
}
