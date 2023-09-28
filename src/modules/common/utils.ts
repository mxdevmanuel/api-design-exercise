export const ifthen = <T = unknown, F = unknown>(
  condition: boolean,
  truthy: T,
  falsey: F
) => {
  let result;
  if (condition) {
    result = typeof truthy === 'function' ? truthy() : truthy;
  } else {
    result = typeof falsey === 'function' ? falsey() : falsey;
  }
  return result;
};
