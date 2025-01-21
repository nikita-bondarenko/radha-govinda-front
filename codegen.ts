import type { CodegenConfig } from "@graphql-codegen/cli";
import { createHook } from "async_hooks";

const config: CodegenConfig = {
  overwrite: true,
  schema:process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1338/graphql",
  documents: "./graphql/**/*.graphql",
  generates: {
    "./src/gql/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        reactApolloVersion: 3,
      },
    },
  },
};

export default config;
