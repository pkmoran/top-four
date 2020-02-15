import { h } from 'preact';
import { shallow } from 'enzyme';

import { Create } from 'components/create';

describe('<Create />', () => {
  it('calls the start game function', () => {
    const startGame = jest.fn();
    const wrapper = shallow(<Create startGame={startGame} />);

    wrapper.find('button').simulate('click');

    expect(startGame.mock.calls.length).toBe(1);
  });
});
