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
    const eventSource = new EventSource('/founders');
    eventSource.addEventListener('message', (response) => {
      console.dir(response);
      this.setState({
        foundersList : JSON.parse(response.data)
      });
    });
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