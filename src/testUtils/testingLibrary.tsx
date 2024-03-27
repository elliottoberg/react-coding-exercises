import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { QueryClientProvider } from "../api/queryClientProvider";
import { LocationRef, MemoryRouterWithExposedLocation } from "./components";
import userEvent from "@testing-library/user-event";

// re-export everything so tests are consistently importing from this file vs having imports from both RTL and this file.
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

// A custom render function that always uses the required wrappers.
// TODO: allow passing RTL render options through if needed.
export function renderWithProviders(component: ReactNode, options?: { url?: string | string[] }) {
  const locationRef: LocationRef = { current: {} };
  const history = options?.url ? (Array.isArray(options.url) ? options.url : [options.url]) : undefined;
  const user = userEvent.setup();

  const wrapper = ({ children }: { children: ReactNode }) =>
    <QueryClientProvider>
      <MemoryRouterWithExposedLocation history={history} locationRef={locationRef}>
        {children}
      </ MemoryRouterWithExposedLocation>
    </ QueryClientProvider>

  const matchers = render(component, { wrapper });

  return {
    ...matchers,
    location: locationRef.current,
    user
  }
}