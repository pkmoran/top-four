import { h } from 'preact';

import Logo from 'components/shared/logo';

const Instructions = () => (
  <div>
    <Logo size="small" />
    <br />
    Top Four is a party game in which you rank random things and your friends
    guess how you ranked them. Do you like mayonnaise more than small dogs? Are
    you secretly Kenny G's biggest fan? Is coffee not your cup of tea? Let's
    find out!
    <h2>Overview</h2>
    The game is broken into multiple rounds. In each round, a player is chosen
    at random to be the "Ranker." If you're the Ranker, you'll receive four
    trivial yet polarizing topics to rank from best to worst based on your
    personal preference.
    <br />
    <br />
    For example, you may see: Road Trips, Rainy Sundays, Dave Matthews Band, and
    Scrambled Eggs. Rank them based on how you feel about each one and "lock in"
    your response. Be sure to keep your response a secret from the other
    players!
    <br />
    <br />
    All other players in the game will try to guess how you responded, then
    "lock in" on their own screens.
    <br />
    <br />
    Once everyone is locked in, you reveal your responses! Have fun with it!
    <br />
    <br />
    After revealing all four topics, a new round begins and a new Ranker is
    assigned. The game continues until there are no more topics left to rank.
    <h2>How to start</h2>
    Once you have a group of players together, click START A NEW GAME and follow
    the prompts. You'll receive a game code to share with other players. The
    rest of the players click JOIN AN EXISTING GAME, enter the code and start
    playing!
    <h2>How to win</h2>
    Players get one point for each topic that they place in the exact same
    position as the Ranker. The player with the most points at the end of the
    game wins!
  </div>
);

export { Instructions };
export default Instructions;
