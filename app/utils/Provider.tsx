"use client";
import React from "react";
import { client } from "../../graphql/gql.setup";
import { ApolloProvider } from "@apollo/client";
import { AppStorage } from "../utils/AppContext";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AppStorage>{children}</AppStorage>
    </ApolloProvider>
  );
}
