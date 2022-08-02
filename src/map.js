import { Component } from "react";

export default class Map extends Component {
    render() {
        return (
            <img src={this.props.map_src} alt={this.props.city}></img>
        )
    }
}