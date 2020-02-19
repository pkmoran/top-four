import { h } from 'preact';

const Topics = ({ topicPacks, topicPackUid, setTopicPackUid }) => {
  return (
    <div class="topics">
      <h3>What topics do you want to play with?</h3>
      <div class="topics__choices">
        {topicPacks &&
          topicPacks.map(({ uid, name }) => (
            <span key={uid}>
              <input
                type="radio"
                id={uid}
                name="topics"
                value={uid}
                onChange={() => setTopicPackUid(uid)}
                checked={topicPackUid === uid}
              />
              <label htmlFor={uid}>{name}</label>
            </span>
          ))}
      </div>
    </div>
  );
};

export default Topics;
