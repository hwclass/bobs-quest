import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import { triggerEvent } from "react-google-maps/lib/utils";
import { default as canUseDOM } from "can-use-dom";
import { default as _ } from "lodash";
import Map from './components/Map';
import FoundersList from './components/FoundersList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foundersList : [],
      selectedFounder : null,
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }]
    }
    const eventSource = new EventSource('/founders');
    eventSource.addEventListener('message', (response) => {
      console.dir(response);
      this.setState({
        foundersList : JSON.parse(response.data)
      });
    });
    this.handleWindowResize = _.throttle(this.handleWindowResize, 500);
  }

  handleMapClick(event) {
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });

    if (markers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
  }

  handleMarkerRightClick(index, event) {
    /*
    * All you modify is data, and the view is driven by data.
    * This is so called data-driven-development. (And yes, it's now in
    * web front end and even with google maps API.)
    */
    let { markers } = this.state;
    markers = update(markers, {
     $splice: [
       [index, 1],
     ],
    });
    this.setState({ markers });
  }

  handleWindowResize() {
    console.log(`handleWindowResize`, this._googleMapComponent);
    triggerEvent(this._googleMapComponent, `resize`);
  }

  componentDidMount () {
    if (!canUseDOM) {
      return;
    }
    window.addEventListener('resize', this.handleWindowResize);
  }

  render () {
    return (
      <div>
        <section style={{height: "400px", width : "100%"}}>
          <GoogleMapLoader
            containerElement={
              <div {...this.props} style={{height: "400px", width : "100%"}}/>
            }
            googleMapElement={
              <GoogleMap
                ref={(map) => console.log(map)}
                defaultZoom={3}
                defaultCenter={{lat: -25.363882, lng: 131.044922}}
                onClick={this.handleMapClick}>
                {this.state.markers.map((marker, index) => {
                  return (
                    <Marker
                      {...marker}
                      onRightclick={this.handleMarkerRightClick.bind(this, index)} />
                  );
                })}
              </GoogleMap>
            }
          />
        </section>
        <FoundersList foundersList={this.state.foundersList} />
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.querySelector('#app'));