import cx from 'utilities/cx';

describe('.cx', () => {
  it('joins class names into a single string', () => {
    expect(cx('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('joins keys of an object that are truthy', () => {
    expect(cx({ foo: true, bar: false, baz: 17 })).toBe('foo baz');
  });

  it('joins a combination of strings and an object', () => {
    expect(cx('btn', { btn__primary: true, btn__fake: false })).toBe(
      'btn btn__primary'
    );
  });
});
