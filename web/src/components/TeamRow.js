import React from 'react';
import Button from '@material-ui/core/Button';

const TeamRow = ({ name, playerCount, onClick }) => (
  <div className="TeamRow">
    <Button
      onClick={onClick}
    >
      {name}
    </Button>

    <span>{playerCount}</span>
  </div>
);

export default TeamRow;
