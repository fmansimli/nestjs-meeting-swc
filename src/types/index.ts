export type UserPayload = {
  id: number;
  email: string;
  claims: string[];
  iat: number;
  exp: number;
  tid: string;
};
