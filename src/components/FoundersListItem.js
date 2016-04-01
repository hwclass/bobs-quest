import React from 'react';

const FoundersListItem = ({founder, onFoundersListItemClick}) => {
  return (
    <li 
      onClick={() => onFoundersListItemClick(founder)} 
      key={founder.key}> {founder.CompanyName}, {founder.Founder}
    </li>
  )
}

export default FoundersListItem;