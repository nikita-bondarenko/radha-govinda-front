import type { CodegenConfig } from "@graphql-codegen/cli";
import { createHook } from "async_hooks";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://admin-bart-group.b-art-it.ru/graphql",
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
