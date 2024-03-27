import { ReactNode } from "react";
import { MemoryRouter, useLocation } from "react-router-dom";

export type LocationRef = {
  current: Location | object;
}

export function MemoryRouterWithExposedLocation({ children, history, locationRef }: { children: ReactNode, history: string[] | undefined, locationRef: LocationRef }) {
  // We can only assign the locationRef from a child of the MemoryRouter since the router is the context provider.
  return (
    <MemoryRouter initialEntries={history} >
      <AssignLocationRef locationRef={locationRef} />
      {children}
    </ MemoryRouter>
  );
}

function AssignLocationRef({ locationRef }: { locationRef: LocationRef  }) {
  const location = useLocation();
  locationRef.current = location;

  return null;
}