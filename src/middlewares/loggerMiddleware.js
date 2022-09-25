export const loggerMiddleware = dispatch => action => {
  // eslint-disable-next-line no-console
  process.env.NODE_ENV === 'development' && console.log('logger', action);
  return action;
};
