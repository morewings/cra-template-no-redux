export const loggerMiddleware = dispatch => action => {
  // eslint-disable-next-line no-console
  console.log('logger', action);
  return action;
};
