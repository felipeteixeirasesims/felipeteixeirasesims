class ServerError extends Error {

  constructor(stack: string) {
    super(stack);
  }
}

export default ServerError;