import { Component } from "react";

export default class ErrorComp extends Component {
  render() {
    return (
      <p>{this.props.error}</p>
    )
  }
}