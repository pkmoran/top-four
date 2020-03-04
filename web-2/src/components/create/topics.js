import { h } from 'preact';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';

const Topics = ({ topicPacks, topicPackUid, setTopicPackUid }) => {
  return (
    <div class="topics">
      <span class="topics__header">What topics do you want to play with?</span>
      <div class="topics__choices">
        <RadioGroup
          value={topicPackUid}
          onChange={({ target: { value } }) => setTopicPackUid(value)}
        >
          {topicPacks &&
            topicPacks.map(({ uid, name }) => (
              <FormControlLabel value={uid} control={<Radio />} label={name} />
            ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Topics;
