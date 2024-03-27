import { QueryClient } from "@tanstack/react-query";
import QueryConfig from "./src/api/reactQueryConfig";
import "@testing-library/jest-dom";
import config from "react-transition-group/config";

global.beforeEach(() => {
  jest.restoreAllMocks(); // Works on jest.spyOn AND jest.replaceProperty
  jest.resetAllMocks(); // Resets all mocked functions (including automocks)
  jest.replaceProperty(QueryConfig, "client", buildTestQueryClient());
  config.disabled = true;
});

export function buildTestQueryClient(options = {}) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        ...options
      },
    }
  });
}