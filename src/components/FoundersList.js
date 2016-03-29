import React, {Component} from 'react';
import FoundersListItem from './FoundersListItem';

class FoundersList extends Component {
  
  constructor (props) {
    super(props);
  }

  render () {

    const founders = this.props.foundersList.map((founder) => {
      return <FoundersListItem key={founder.Id} founder={founder} />
    })

    return (
      <ul>
        {founders}
      </ul>
    )
  }

}

export default FoundersList;