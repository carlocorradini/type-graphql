import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import type { Context } from "./context.type";
import { dataSource } from "./datasource";
import { seedDatabase } from "./helpers";
import { RecipeResolver } from "./resolvers";

async function bootstrap() {
  // Create TypeORM connection
  await dataSource.initialize();

  // Seed database with some data
  const { defaultUser } = await seedDatabase();

  // Build TypeGraphQL executable schema
  const schema = await buildSchema({
    // Array of resolvers
    resolvers: [RecipeResolver],
  });

  // Create mocked context
  const context: Context = { user: defaultUser };

  // Create GraphQL server
  const server = new ApolloServer<Context>({ schema });

  // Start server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => context,
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap();
