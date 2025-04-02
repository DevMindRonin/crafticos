import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5000/graphql", // URL backendového GraphQL API
  documents: ["src/**/*.{ts,tsx}"], // Hledej dotazy v React komponentách
  generates: {
    "./src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
