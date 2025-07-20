import type { CodegenConfig } from "@graphql-codegen/cli";
import 'cross-fetch/polyfill';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [ "https://admin.radha-govinda.bondarenko-nikita.ru/graphql"]: {
        headers: {
          Authorization: `Bearer 6eec5aa3198bca325795a3361ba118a5c48de4f0c86bb744d8e0349c9c54655f7f0c0725962c2620b8c8c03f0b28f7438ca285a06bc76f7cd0b04aa8320d35fe9bed7ae4246809d708d87b6874bf0474c2260b4fd868456f96dc5f383fda30de67ab423bc13d4005452afda315e2517235e5694bf00df1986063fc88c3415bea`,
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
