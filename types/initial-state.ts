// types/initial-state.ts
export interface State {
  errors?: {
    email?: string[];
    password?: string[];
    firstName?: string[];
    lastName?: string[];
    checkbox?: string[]
  };
  message?: string | null; // Changed from `string | null` to `string | undefined`
}