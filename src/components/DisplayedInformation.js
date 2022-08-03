import { Component } from "react";

export default class DisplayedInformation extends Component {
  render () {
    return (
      <>
        <p>City Name: {this.props.cityInfo.display_name}</p>
        <p>Lat: {this.props.cityInfo.latitude}</p>
        <p>LonL {this.props.cityInfo.longitude}</p>
      </>
    )
  }
}