import { h } from 'preact';
import { shallow } from 'enzyme';

import { Footer } from 'components/game/footer';

describe('<Footer />', () => {
  it('hides actions when there is no confirmAction', () => {
    const wrapper = shallow(<Footer confirmAction={null} />);

    expect(
      wrapper.find('div.game-footer__actions').hasClass('visibility--hidden')
    ).toBe(true);
  });
});
