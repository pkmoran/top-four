import { EventBuilder } from '../analytics';

describe('the EventBuilder', () => {
  it('should record all properties', () => {
    const event = new EventBuilder()
      .category('category_1')
      .action('action_1')
      .label('label_1')
      .value(42).event;

    expect(event.category).toEqual('category_1');
    expect(event.action).toEqual('action_1');
    expect(event.label).toEqual('label_1');
    expect(event.value).toEqual(42);
  });
});
