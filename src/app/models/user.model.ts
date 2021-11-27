export interface UserI {
  name?: string;
  email: string;
  password: string;
}

export interface JwtUserI {
  body: {
    user: string;
    email: string;
    password: string;
  }
}