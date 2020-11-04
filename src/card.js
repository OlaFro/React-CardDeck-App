import React, { Component } from "react";
import "./card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 25;
    let xPos = Math.random() * 80 - 20;
    let yPos = Math.random() * 80 - 20;
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }

  render() {
    return (
      <div className="card">
        <img
          style={{ transform: this._transform }}
          src={this.props.src}
          alt={this.props.alt}
        />
      </div>
    );
  }
}
