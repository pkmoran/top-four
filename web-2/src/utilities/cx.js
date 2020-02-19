const spaceSeparate = (...strings) => {
  return strings.join(' ');
};

const compactObj = obj => Object.keys(obj).filter(key => !!obj[key]);

const classNames = (...args) => {
  return args.reduce((memo, arg) => {
    if (arg === undefined) return memo.trim();

    if (typeof arg === 'string') {
      return spaceSeparate(memo, arg).trim();
    }

    const keys = compactObj(arg);
    return spaceSeparate(memo, ...keys).trim();
  }, '');
};

export default classNames;
