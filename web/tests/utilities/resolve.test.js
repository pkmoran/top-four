import resolve from 'utilities/resolve';

describe('.resolve', () => {
  it('resolves a root level path', () => {
    expect(resolve('rootKey', { rootKey: 42 })).toBe(42);
  });

  it('resolves a nested path', () => {
    expect(resolve('root.nested.key', { root: { nested: { key: 42 } } })).toBe(
      42
    );
  });

  it('returns null if the path does not resolve', () => {
    expect(resolve('root.key', { asdf: 42 })).toBeNull();
  });
});
