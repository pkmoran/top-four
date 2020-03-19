import { h } from 'preact';

const Topic = ({ topic: { uid, topic } }) => {
  return <div class="topic">{topic}</div>;
};

export { Topic };
export default Topic;
