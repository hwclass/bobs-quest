import React from 'react';

const FoundersListItem = ({founder}) => {
  return (
    <li>{founder.Id}, {founder.CompanyName}, {founder.Founder}</li>
  )
}

export default FoundersListItem;