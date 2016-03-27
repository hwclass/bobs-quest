import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Map from './components/Map'
import FoundersList from './components/FoundersList'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foundersList : [
        {id: 'dGFraW5hcmRp', name : 'Larry Page & Sergey Brin', company : 'Google'},
        {id: 'cGVzc290dG8=', name : 'Steve Jobs & Steve Wozniak', company : 'Apple'},
        {id: 'Y29udGU=', name : 'Bill Gates', company : 'Microsoft'}
      ],
      selectedFounder : null
    }
  }

  render () {
    return (
      <div>
        <Map />
        <FoundersList foundersList={this.state.foundersList}/>
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.querySelector('#app'));