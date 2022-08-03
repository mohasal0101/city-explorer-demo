import { Component } from "react";

export default class Map extends Component {
  render() {
    return (
      <img src={this.props.mapSource} alt="" />
    )
  }
}