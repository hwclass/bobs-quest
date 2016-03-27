import React from 'react';

const FoundersListItem = ({founder}) => {
  return (
    <li>{founder.id}, {founder.name}, {founder.company}</li>
  )
}

export default FoundersListItem;