const resolve = (path, obj) => {
  return path
    .split('.')
    .reduce((prev, curr) => (prev ? prev[curr] : null), obj);
};

export default resolve;
