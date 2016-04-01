import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { default as update } from "react-addons-update";
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import { triggerEvent } from "react-google-maps/lib/utils";
import { default as canUseDOM } from "can-use-dom";
import { default as _ } from "lodash";
import Header from './components/Header';
import Info from './components/Info';
import Map from './components/Map';
import FoundersList from './components/FoundersList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foundersList : [],
      selectedFounder : null,
      center : {lat : 0.0, lng : 0.0},
      markers: [{
        position: {
          lat : 0.0,
          lng : 0.0
        },
        key: this.getRandomKey(),
        defaultAnimation: 2,
        zoom: 1
      }],
      zoom: 1,
      latestUpdate : (new Date()).toLocaleTimeString()
    }
  
    const eventSource = new EventSource('/founders');
    
    eventSource.addEventListener('message', (response) => {
      const foundersList = JSON.parse(response.data);
      const markers = foundersList.map((founder) => {
        return { position : { lat: founder.GarageLatitude, lng: founder.GarageLongitude }, key: this.getRandomKey(), defaultAnimation: 2, zoom: 1 }
      });
      if (this.isDifferentArrayOfObjects(this.state.markers, markers)) {
        this.setState({
          foundersList : JSON.parse(response.data),
          markers : markers,
          latestUpdate : (new Date()).toLocaleTimeString()
        });
      }
      this.handleWindowResize = _.throttle(this.handleWindowResize, 500);
    });

  }

  getRandomKey () {
    return Math.random(Date.now() * 100);
  }

  isDifferentArrayOfObjects (firstArr, secondArray) {
    return (!_.isEmpty(_.difference(firstArr, secondArray)));
  }

  handleMapClick(event) {
    let { markers } = this.state.markers;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: this.getRandomKey()
        },
      ],
    });
    this.setState({ markers });

    if (markers.length === 3) {
      this.props.toast(
        'Right click on the marker to remove it',
        'Also check the code!'
      );
    }
  }

  handleMarkerRightClick(index, event) {
    let { markers } = this.state;
    markers = update(markers, {
     $splice: [
       [index, 1],
     ],
    });
    this.setState({ markers });
  }

  handleWindowResize() {
    triggerEvent(this._googleMapComponent, 'resize');
  }

  onFoundersListItemClick (selectedFounder) {
    this.setState({
      selectedFounder,
      center : {lat: selectedFounder.GarageLatitude, lng:  selectedFounder.GarageLongitude }
    })
  }

  onShowAllButtonClick () {
    this.setState({
      zoom : 1
    });
    console.log('onShowAllButtonClick');
  }

  componentWillMount () {
    this.setState({
      foundersList : [],
      selectedFounder : null,
      markers: [{
        position: {
          lat : 0.0,
          lng : 0.0
        },
        key: this.getRandomKey(),
        defaultAnimation: 2,
        zoom: 1
      }]
    })
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
        <Header />
        <Info />
        <section style={{height: "400px", width : "100%"}}>
          <GoogleMapLoader
            containerElement={
              <div {...this.props} style={{height: "400px", width : "100%"}}/>
            }
            googleMapElement={
              <GoogleMap
                defaultZoom={this.state.zoom}
                zoom={this.state.zoom}
                defaultCenter={this.state.center}
                center={this.state.center}
                onClick={this.handleMapClick}>
                {this.state.markers.map((marker, index) => {
                  return (
                    <Marker
                      position={marker.position}
                      key={marker.key}
                      onRightclick={this.handleMarkerRightClick.bind(this, index)} />
                  );
                })}
              </GoogleMap>
            }
          />
        </section>
        <FoundersList
          onFoundersListItemClick={selectedFounder => this.onFoundersListItemClick(selectedFounder)}
          foundersList={this.state.foundersList}
          latestUpdate={this.state.latestUpdate}
          onShowAllButtonClick={() => this.onShowAllButtonClick}/>
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.querySelector('#app'));
