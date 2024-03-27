import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import QueryConfig from "./reactQueryConfig";

export function QueryClientProvider({ children }: { children?: ReactNode }){
  const queryClient = QueryConfig.client;

  return (
    <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
  );
} 
