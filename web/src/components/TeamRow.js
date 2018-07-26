import React from 'react';
import Button from '@material-ui/core/Button';

import './styles/TeamRow.css';

const TeamRow = ({
  name, playerCount, selected, onClick
}) => (
  <div className="TeamRow">
    <Button
      className="TeamRowButton"
      variant={selected ? 'contained' : 'text'}
      onClick={onClick}
    >
      {name}
    </Button>
    <span className="TeamRowPlayerCount">{playerCount}</span>
  </div>
);

export default TeamRow;
