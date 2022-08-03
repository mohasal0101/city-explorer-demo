import { Component } from "react"

export default class Movie extends Component {
  render() {
    return (
        this.props.movie.map(item => 
          <>
            <p>{item.title}</p>
            <p>{item.released_on}</p>
            <p>{item.popularity}</p>
          </>
          )
    )
  }
}