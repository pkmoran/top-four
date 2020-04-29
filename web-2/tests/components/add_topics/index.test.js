import { h } from 'preact';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';

import { AddTopics } from 'components/add_topics';
import Topic from 'components/add_topics/topic';

describe('<AddTopics />', () => {
  describe('add button', () => {
    it('is disabled when the topic field is empty', () => {
      const wrapper = shallow(<AddTopics playerTopics={[]} routes={[]} />);

      wrapper
        .find(TextField)
        .props()
        .onInput({ target: { value: '' } });

      expect(
        wrapper.find(Button).filter({ name: 'add' }).props().disabled
      ).toBe(true);
    });

    it('is enabled when the topic field is populated', () => {
      const wrapper = shallow(<AddTopics playerTopics={[]} routes={[]} />);

      wrapper
        .find(TextField)
        .props()
        .onInput({ target: { value: 'socks with sandals' } });

      expect(
        wrapper.find(Button).filter({ name: 'add' }).props().disabled
      ).toBe(false);
    });

    it('clears the input when clicked', () => {
      const wrapper = shallow(
        <AddTopics playerTopics={[]} addTopic={() => {}} routes={[]} />
      );

      wrapper
        .find(TextField)
        .props()
        .onInput({ target: { value: 'road trips' } });

      wrapper.find(Button).filter({ name: 'add' }).props().onClick();

      expect(wrapper.find(TextField).props().value).toBe('');
    });

    it('calls the addTopic function when clicked', () => {
      const addTopic = jest.fn();

      const wrapper = shallow(
        <AddTopics playerTopics={[]} addTopic={addTopic} routes={[]} />
      );

      wrapper
        .find(TextField)
        .props()
        .onInput({ target: { value: 'sex on the beach' } });

      wrapper.find(Button).filter({ name: 'add' }).props().onClick();

      expect(addTopic).toHaveBeenCalledTimes(1);
      expect(addTopic.mock.calls[0][0]).toBe('sex on the beach');
    });
  });

  it('renders player topics', () => {
    const playerTopics = [
      { uid: '12345', topic: 'road trips' },
      { uid: '23456', topic: 'johnny depp' }
    ];

    const wrapper = shallow(
      <AddTopics playerTopics={playerTopics} routes={[]} />
    );

    expect(wrapper.find(Topic)).toHaveLength(2);
  });

  it('renders the total number of topics', () => {
    const wrapper = shallow(
      <AddTopics playerTopics={[]} numTopics={12} routes={[]} />
    );

    expect(wrapper.find('span[name="numTopics"]').text()).toBe(
      'Total Topics: 12'
    );
  });

  it('disables the done button when there are less than 4 topics', () => {
    const wrapper = shallow(
      <AddTopics playerTopics={[]} numTopics={3} routes={[]} />
    );

    expect(wrapper.find(Button).filter({ name: 'done' }).props().disabled).toBe(
      true
    );
  });
});
