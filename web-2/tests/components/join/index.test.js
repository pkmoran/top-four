import { h } from 'preact';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';

import { Join } from 'components/join';

describe('<Join />', () => {
  it('calls the joinGame function', () => {
    const joinGame = jest.fn().mockResolvedValue();

    const wrapper = shallow(<Join joinGame={joinGame} />);

    const nameField = wrapper.find(TextField).filter({ name: 'name' });
    const gameCodeField = wrapper.find(TextField).filter({ name: 'gameId' });

    nameField.props().onInput({ target: { value: 'The Grund' } });
    gameCodeField.props().onInput({ target: { value: 'A5' } });

    wrapper
      .find(Button)
      .props()
      .onClick();

    expect(joinGame).toHaveBeenCalledTimes(1);
    expect(joinGame.mock.calls[0][0]).toEqual({
      name: 'The Grund',
      gameId: 'A5'
    });
  });
});
