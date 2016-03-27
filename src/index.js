import React, {Component} from 'react';
imort ReactDOM from 'react-dom';

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
      <Map />
      <FoundersList />
    )
  }

}

ReactDOM.render(<App/>, document.querySelector('#app'));