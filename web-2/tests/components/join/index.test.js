import { h } from 'preact';
import { shallow } from 'enzyme';
import { Button, CircularProgress, TextField } from '@material-ui/core';

import { Join } from 'components/join';

describe('<Join />', () => {
  describe('join button', () => {
    it('is disabled when the name field is empty', () => {
      const wrapper = shallow(<Join />);
      const gameIdField = wrapper.find(TextField).filter({ name: 'gameId' });

      gameIdField.props().onInput({ target: { value: 'A6' } });

      expect(wrapper.find(Button).props().disabled).toBe(true);
    });

    it('is disabled where the game ID field is empty', () => {
      const wrapper = shallow(<Join />);
      const nameField = wrapper.find(TextField).filter({ name: 'name' });

      nameField.props().onInput({ target: { value: 'andrew' } });

      expect(wrapper.find(Button).props().disabled).toBe(true);
    });

    it('is enabled when the name and game ID field are populated', () => {
      const wrapper = shallow(<Join />);
      const nameField = wrapper.find(TextField).filter({ name: 'name' });
      const gameIdField = wrapper.find(TextField).filter({ name: 'gameId' });

      nameField.props().onInput({ target: { value: 'andrew' } });
      gameIdField.props().onInput({ target: { value: 'A6' } });

      expect(wrapper.find(Button).props().disabled).toBe(false);
    });

    it('is loading when joining a game', () => {
      const wrapper = shallow(
        <Join joinGame={jest.fn().mockResolvedValue()} />
      );

      const nameField = wrapper.find(TextField).filter({ name: 'name' });
      const gameIdField = wrapper.find(TextField).filter({ name: 'gameId' });
      const joinButton = wrapper.find(Button);

      nameField.props().onInput({ target: { value: 'andrew' } });
      gameIdField.props().onInput({ target: { value: 'A6' } });

      expect(wrapper.find(CircularProgress).exists()).toBe(false);

      joinButton.props().onClick();

      expect(wrapper.find(CircularProgress).exists()).toBe(true);
    });

    it('calls the joinGame function', () => {
      const joinGame = jest.fn().mockResolvedValue();

      const wrapper = shallow(<Join joinGame={joinGame} />);

      const nameField = wrapper.find(TextField).filter({ name: 'name' });
      const gameIdField = wrapper.find(TextField).filter({ name: 'gameId' });

      nameField.props().onInput({ target: { value: 'The Grund' } });
      gameIdField.props().onInput({ target: { value: 'A5' } });

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

  it('displays an error state when joining a game fails', async () => {
    const joinGame = jest.fn().mockRejectedValue();

    const wrapper = shallow(<Join joinGame={joinGame} />);

    expect(
      wrapper
        .find(TextField)
        .filter({ name: 'gameId' })
        .props().error
    ).toBe(false);
    expect(
      wrapper
        .find(TextField)
        .filter({ name: 'gameId' })
        .props().helperText
    ).toBe('');

    await wrapper
      .find(Button)
      .props()
      .onClick();

    expect(
      wrapper
        .find(TextField)
        .filter({ name: 'gameId' })
        .props().error
    ).toBe(true);
    expect(
      wrapper
        .find(TextField)
        .filter({ name: 'gameId' })
        .props().helperText
    ).toBe('Invalid Game ID');
  });

  it('clears the error state when the game ID field changes', async () => {
    const joinGame = jest.fn().mockRejectedValue();

    const wrapper = shallow(<Join joinGame={joinGame} />);

    await wrapper
      .find(Button)
      .props()
      .onClick();

    expect(
      wrapper
        .find(TextField)
        .filter({ name: 'gameId' })
        .props().error
    ).toBe(true);

    wrapper
      .find(TextField)
      .filter({ name: 'gameId' })
      .props()
      .onInput({ target: { value: 'A6' } });

    expect(
      wrapper
        .find(TextField)
        .filter({ name: 'gameId' })
        .props().error
    ).toBe(false);
  });
});
