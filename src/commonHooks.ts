
export interface HookProviderProps<T> {
  /** A hook with no arguments */
  useHook(): T;

  /** Optional children that are passed the output of the hook */
  children?: (hookOutput: T) => JSX.Element;
}

export function HookProvider<T>({ useHook, children }: HookProviderProps<T>): JSX.Element | null {
  const output = useHook();
  return children?.(output) ?? null;
}
