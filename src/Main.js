import React, { Component } from "react";
import Card from "./card";
import axios from "axios";
import "./main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      draw: [],
      end: false,
      style: { display: "inline" },
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle")
      .then((response) => {
        let id = response.data.deck_id;
        this.setState({
          id: id,
        });
      })
      .then();
  }

  handleClick() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.id}/draw/ `)
      .then((response2) => {
        let data = response2.data.cards[0];
        if (data) {
          this.setState((oldState) => ({
            draw: [
              ...oldState.draw,
              {
                suit: data.suit,
                value: data.value,
                img: data.images.png,
                id: data.code,
                key: data.code,
                success: response2.data.success,
              },
            ],
          }));

          console.log(response2.data.success);
        } else {
          this.setState({ ...this.state, style: { display: "none" } });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let cards = this.state.draw.map((elem) => {
      if (elem.success) {
        return <Card src={elem.img} alt={elem.id} />;
      } else {
        return "";
      }
    });

    return (
      <div className="main">
        <button
          className="button"
          style={this.state.style}
          onClick={this.handleClick}
          type="button"
        >
          draw a card
        </button>
        <div className="deck">{cards}</div>
      </div>
    );
  }
}
