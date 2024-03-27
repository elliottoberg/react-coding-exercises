import { QueryClient } from "@tanstack/react-query";

// NOTE: This window ref exists to ensure that if multiple bundles include this config file, we still end up with a singleton query client.
const defaultQueryClient = window.queryClient || buildDefaultQueryClient();
window.queryClient = defaultQueryClient;

function buildDefaultQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 // 60 seconds
      }
    }
  });
}

const config = {
  client: defaultQueryClient
}

export default config;