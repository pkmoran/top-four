import React from 'react';
import Button from '@material-ui/core/Button';

import './styles/AddTopicRow.css';

const AddTopicRow = ({ topic, onDelete }) => (
  <div className="AddTopicRow">
    <span className="Topic">{topic}</span>
    <Button onClick={onDelete}>Delete</Button>
  </div>
);

export default AddTopicRow;
