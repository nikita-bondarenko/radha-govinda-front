import type { CodegenConfig } from "@graphql-codegen/cli";
import 'cross-fetch/polyfill';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [ "https://admin.radhagovindadasa.com/graphql"]: {
        headers: {
          Authorization: `Bearer 64e21ffad4cb720508302c22bca95b58a84d5212a274ff354820c715b247c3ed9bcd977816351ae186636ca9e0ce3f38253dcd5e85550f4849b54032a80ad7b8d93a9d9446bc65850eb21215ff38b1f8d902e565fdc74817cecf2bd90c701264b7285197483303e379c2e5446f879090cd5dc9619b8102e93af5a1a6228e7bd0`,
          'Content-Type': 'application/json',
        },
      },
    },
  ],  documents: "./graphql/**/*.graphql",
  generates: {
    "./src/gql/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        // "typed-document-node"
      ],
      // config: {
      //   withHooks: true,
      //   withHOC: false,
      //   withComponent: false,
      //   reactApolloVersion: 3,
      // },
    },
  },
};

export default config;
