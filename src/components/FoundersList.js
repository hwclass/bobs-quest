import React from 'react';
import FoundersListItem from './FoundersListItem';

const FoundersList = (props) => {

  const founders = props.foundersList.map((founder) => {
    return (
      <FoundersListItem 
        key={Math.random(Date.now() * 100)} 
        founder={founder} 
        onFoundersListItemClick={props.onFoundersListItemClick}/>
    )
  });

  return (
    <ul>
      {founders}
    </ul>
  )

}

export default FoundersList;