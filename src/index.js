import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Map from './components/Map'
import FoundersList from './components/FoundersList'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foundersList : [],
      selectedFounder : null
    }
  }

  render () {
    return (
      <div>
        <Map />
        <FoundersList />
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.querySelector('#app'));