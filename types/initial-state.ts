export interface State {
  errors: {
    email?: string[];
    firstName?: string[];
    lastName?: string[];
    password?: string[];
  };
  message: string | null;
}
