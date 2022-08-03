import { Component } from "react";

export default class Weather extends Component {
  render() {
    return (
      <>
        {this.props.weatherInformation.map(item =>
          <li>{item.date} : {item.descriptioin}</li>
        )
        }
      </>
    )
  }
}