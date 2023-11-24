declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }

  export interface Response {
    __: any;
  }
}
