import React from 'react';

const ShowAllButton = ({onShowAllButtonClick}) => {
  return (<button onClick={() => onShowAllButtonClick()} >Show All</button>)
}

export default ShowAllButton;