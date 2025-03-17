"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
